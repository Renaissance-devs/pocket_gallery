'use strict';

// Application Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
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
app.use(cors());

//*********************************************************************
//
//  DATA MODEL
//
//**********************************************************************/


function Art(info, gallery) {
  const placeholderImage = '/assets/placeholder.jpg';

  this.artist = info.peoplecount > 0 ? info.people[0].name : 'artist unavailable';
  this.title = info.title || 'title unavailable';
  this.image_url = info.images[0].baseimageurl ? info.images[0].baseimageurl : placeholderImage;
  this.century = info.century || 'century unavailable';
  this.gallery = gallery;
}


//*********************************************************************
//
//  ROUTES
//
//**********************************************************************/

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
app.put('/gallery', createGallery);
app.delete('/gallery', deleteGallery);
app.post('/searches/results', searchResults);
app.post('/works', createWork);
app.get('/works/:id', getOneWork);
app.put('/works/:id', updateWork);
app.delete('/works/:id', deleteWork);
app.get('/galleries', manageGalleries);
app.get('/about', renderAbout);

app.get('*', (request, response) => response.render('pages/error', {
  error: '404 Page Not Found'
}));


// *********************************************************************
//
//  ROUTE HANDLERS
//
//**********************************************************************/

function gallerySelect(request, response) {
  if (request.body.gallery === 'all') {
    response.redirect('/');
  }
  let SQL = `SELECT works.artist, works.title, works.image_url, works.id, gallery.name FROM works JOIN gallery ON works.gallery_id=gallery.id WHERE name=$1`;
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
  let SQL = `SELECT works.artist, works.title, works.image_url, works.id, gallery.name FROM works JOIN gallery ON works.gallery_id=gallery.id`;
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
    let SQL = `SELECT works.artist, works.title, works.image_url, works.id, gallery.name FROM works JOIN gallery ON works.gallery_id=gallery.id WHERE works.id=$1`;
    const values = [request.params.id];
    return client.query(SQL, values).then(results => {
      getColors(results.rows[0].image_url).then(colors => {
        response.render('works/detail', {
          work: results.rows[0],
          galleries: galleries.rows,
          colors: colors
        });
      })
    })
  });
}

function deleteGallery(request, response) {
  const SQL = `DELETE FROM gallery WHERE name=$1`
  const values = [request.body.gallery];
  client.query(SQL, values).then(() => response.redirect('/'));
}

function search(request, response) {
  response.render('searches/new')
}

function searchResults(request, response) {
  let param;
  let search;
  if (request.body.search[1] === 'keyword') {
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
        getGalleries().then(galleries => {
          response.render('searches/show', {
            works: works,
            galleries: galleries.rows
          });
        })
      }
    });
}

function getColors(image_url) {
  let url = `https://api.imagga.com/v2/colors?image_url=${image_url}&extract_object_colors=0`
  return superagent.get(url)
    .set('Authorization', `Basic ${process.env.COLOR_API_KEY}`)
    .then(results => {
      let colorValues = []
      results.body.result.colors.image_colors.forEach(color => colorValues.push(color.closest_palette_color_html_code))
      return colorValues;
    })
    .catch(err => console.error(err));
}

function updateWork(request, response) {
  const gallery = request.body.gallery;
  const id = request.params.id;
  const galleryQuery = `SELECT id FROM gallery WHERE name=$1`;
  const galleryValues = [gallery];
  client.query(galleryQuery, galleryValues).then(galleryId => {
    const values = [galleryId.rows[0].id, id];
    let SQL = `UPDATE works SET gallery_id=$1 WHERE id=$2 RETURNING *`;
    return client.query(SQL, values)
      .then(() => response.redirect(`/works/${id}`))
  }).catch(error => console.error(error.error));
}

function deleteWork(request, response) {
  const values = [request.params.id];
  const SQL = `DELETE FROM works WHERE id=$1`;
  client.query(SQL, values).then(() => response.redirect('/')).catch((error, response) => handleError(error, response));
}

function createWork(request, response) {
  let {
    artist,
    title,
    image_url,
    century
  } = request.body;

  let SQLworks = 'INSERT INTO works(artist, title, image_url, century, gallery_id) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
  let valuesWorks = [artist, title, image_url, century];

  const SQLgallery = 'SELECT id FROM gallery WHERE name=$1';
  const valuesGallery = [request.body.gallery];

  client.query(SQLgallery, valuesGallery).then(galleryId => {
    valuesWorks.push(galleryId.rows[0].id);
    client.query(SQLworks, valuesWorks)
      .then(result => response.redirect(`/works/${result.rows[0].id}`))
      .catch((error, response) => handleError(error, response));
  });
}

function createGallery(request, response) {
  const values = [request.body.gallery];
  const SQL = `INSERT INTO gallery(name) VALUES ($1)`;
  client.query(SQL, values).then(() => response.redirect('/'));
}

function manageGalleries(request, response) {
  getGalleries().then(galleries => {
    response.render('pages/galleries', {
      galleries: galleries.rows
    });
  })
}

function renderAbout(request, response) {
  response.render('pages/about');
}

function handleError(error, response) {
  response.render('pages/error', {
    error: error
  });
}

//*********************************************************************
//
//  HELPERS
//
//**********************************************************************/

function getGalleries() {
  const SQL = `SELECT name FROM gallery ORDER BY name`;
  return client.query(SQL);
}

//*********************************************************************
//
//  ENTRY POINT
//
//**********************************************************************/

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log('server and db are up, listening on port ', PORT);
    });
  });
