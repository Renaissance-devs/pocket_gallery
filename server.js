'use strict';

// Application Dependencies
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

const client = new pg.Client(process.env.DATABASE_URL);
client.on('err', err => console.error(err));


app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static('public'));
app.set('view engine', 'ejs');

// *********************************************************************
//
//  DATA MODEL
//
//********************************************************************* */ 

function Art(info) {
  const placeholderImage = './img/placeholder.jpg';

  this.artist = info.peoplecount > 0 ? info.people[0].name : 'No artist available';
  this.title = info.title || 'No title available';
  this.image_url = info.images[0] ? info.images[0].baseimageurl : placeholderImage;
  this.century = info.century || 'We don\'t have this information';
}


// *********************************************************************
//
//  ROUTES
//
//********************************************************************* */

app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

app.get('/', getArt);


app.get('/searches', search);
app.post('/searches/results', searchResults);
app.post('/works', createWork);
app.get('/works/:id', getOneWork);
app.put('/works/:id', updateWork);
app.delete('/works/:id', deleteWork);

app.get('*', (request, response) => response.status(404).send('This route does not exist'));


// *********************************************************************
//
//  ROUTE HANDLERS
//
//********************************************************************* */


function getArt(request, response) {
  let SQL = 'SELECT * FROM works;';
  return client.query(SQL)
    .then(results => response.render('pages/index', {
      result: results.rows,
      count: results.rows.length
    }))
    .catch((error, response) => handleError(error, response));
}

function getOneWork(request, response) {
  getGalleries().then(galleries => {
    let SQL = `SELECT * FROM works WHERE id=$1`;
    const values = [request.params.id];
    return client.query(SQL, values).then(results => {
      response.render('works/detail', {
        work: results.rows[0],
        galleries: galleries.rows
      });
    })

  });
}

function search(request, response) {
  response.render('searches/new')
}

function searchResults(request, response) {
  let param = 'q';
  let search = request.body.search;
  if (request.body.search[1] === 'title') {
    param = 'title';
    search = request.body.search[0];
  }
  if (request.body.search[1] === 'artist') {
    param = 'person'
    search = request.body.search[0];
  }
  if (request.body.search[1] === 'color') {
    param = 'q=color';
    search = request.body.search[0];
  }
  let url = `https://api.harvardartmuseums.org/object?${param}=${search}&classification=Paintings&apikey=${process.env.ART_API_KEY}`;
  superagent.get(url)
    .then(apiResponse => {
      if (apiResponse.body.info.totalrecords === 0) {
        response.render('searches/noResults');
      } else {
        let works = apiResponse.body.records.filter(work => work.images.length >= 1).map(artResult => new Art(artResult));
        response.render('works/show', {
          works: works
        })
      }
    })
    .catch((error, response) => handleError(error, response));
}


function updateWork(request, response) {
  const gallery = request.body.gallery;
  const id = request.params.id;
  const values = [gallery, id];
  let SQL = `UPDATE works SET gallery=$1 WHERE id=$2 RETURNING *`;

  return client.query(SQL, values).then(results => {
    response.redirect(`/works/${id}`);
  }).catch((error, response) => handleError(error, response));
}

function deleteWork(request, response) {
  const values = [request.params.id];
  const SQL = `DELETE FROM works WHERE id=$1`;
  client.query(SQL, values).then(_ => response.redirect('/')).catch((error, response) => handleError(error, response));
}

function createWork(request, response) {
  let {
    artist,
    title,
    image_url,
    gallery,
    century
  } = request.body;

  let SQL = 'INSERT INTO works(artist, title, image_url, gallery, century) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
  let values = [artist, title, image_url, gallery, century];

  return client
    .query(SQL, values)
    .then(result => {
      response.redirect(`/work/${result.rows[0].id}`);
    })
    .catch((error, response) => handleError(error, response));
}

function handleError(error, response) {
  response.render('pages/error', {
    error: error
  });
}
// *********************************************************************
// 
//  HELPERS
// 
//********************************************************************* */ 

function getGalleries() {
  const SQL = `SELECT DISTINCT gallery FROM works ORDER BY gallery`;
  return client.query(SQL);
}

// *********************************************************************
//
//  ENTRY POINT
//
//********************************************************************* */


client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log('server and db are up, listening on port ', PORT);
    });
  });