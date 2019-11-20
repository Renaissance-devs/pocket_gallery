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
  const placeholderImage = 'assets/placeholder.jpg';

  this.artist = info.peoplecount > 0 ? info.people[0].name : 'artist unavailable';
  this.title = info.title || 'title unavailable';
  this.image_url = info.images[0] ? info.images[0].baseimageurl : placeholderImage;
  this.century = info.century || 'century unavailable';
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
app.post('/gallery', gallerySelect);
app.post('/searches/results', searchResults);
app.post('/works', createWork);
app.get('/works/:id', getOneWork);
app.put('/works/:id', updateWork);
app.delete('/works/:id', deleteWork);
app.get('*', (request, response) => response.render('pages/error', {
  error: '404 Page Not Found'
}));


// *********************************************************************
//
//  ROUTE HANDLERS
//
//********************************************************************* */
function gallerySelect(request, response) {
  if (request.body.gallery === 'all') {
    response.redirect('/');
  }
  let SQL = `SELECT * FROM works WHERE gallery=$1;`;
  const values = [request.body.gallery];
  return client.query(SQL, values)
    .then(results => {
      getGalleries().then(galleries => response.render('pages/index', {
        result: results.rows,
        count: results.rows.length,
        galleries: galleries.rows
      }))
    })
}

function getArt(request, response) {
  let SQL = `SELECT * FROM works;`;
  return client.query(SQL)
    .then(results => {
      getGalleries().then(galleries => response.render('pages/index', {
        result: results.rows,
        count: results.rows.length,
        galleries: galleries.rows
      }))
    })
    .catch(handleError);
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
  let param;
  let search;
  if (request.body.search[1] === 'keyword'){
    param = 'keyword';
    search = request.body.search[0];
  }
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
        let works = apiResponse.body.records.filter(work => work.images ? work.images.length >= 1 : false).map(artResult => new Art(artResult));
        getGalleries().then(galleries => response.render('searches/show', {
          works: works,
          galleries: galleries.rows
        }));
      }
    })
    .catch(err => console.error(err))
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
  client.query(SQL, values).then( () => response.redirect('/')).catch((error, response) => handleError(error, response));
}

function createWork(request, response) {
  let {
    artist,
    title,
    image_url,
    gallery,
    century
  } = request.body;
  console.log(request.body.image_url);
  let SQL = 'INSERT INTO works(artist, title, image_url, gallery, century) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
  let values = [artist, title, image_url, gallery, century];
  // console.log(values);
  return client
    .query(SQL, values)
    .then(result => {
      response.redirect(`/works/${result.rows[0].id}`);
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
