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

// Application Middleware
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    // look in urlencoded POST bodies and delete it
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

// Configure Database
const client = new pg.Client(process.env.DATABASE_URL);
client.on('err', err => console.error(err));

// Art Constructor
function Art(info) {
  const placeholderImage = 'https://unsplash.com/photos/PbEzsnNLcA4';
  this.artist = info.people[0].name || 'No artist available';
  this.title = info.title || 'No title available';
  // this.image_url = info.images[0] ? info.images[0].baseimageurl : placeholderImage;
  this.image_url = info.images[0].baseimageurl || placeholderImage;
  this.century = info.century || 'We don\'t have this information';
}

// Routes
app.get('/', getIndex);
app.get('/searches', search);
app.post('/searches/results', searchResults);
// Inserts the selected art work into the database.
// After the data is inserted, it should render the work with /work/:id
app.post('/works', createWork);

// Callback Functions
function getIndex(request, response) {
  response.render('pages/index');
}

function search(request, response){
  response.render('searches')
}

function searchResults(request, response) {
  let param = 'keyword';
  if (request.body.search[1] === 'title') { param = 'title'; }
  if (request.body.search[1] === 'artist') { param = 'person' }
  if (request.body.search[1] === 'color') { param = 'color'; }
  let url = `https://api.harvardartmuseums.org/object?q=${param}=${request.body.search[0]}&classification=Paintings&apikey=${process.env.ART_API_KEY}`;
  console.log(url);
  superagent.get(url)
    .then(apiResponse => apiResponse.body.records.map(artResult => new Art(artResult)))
    .then(results => response.render('works/show', { works: results }))
    .catch(handleError);
}

function createWork(request, response) {
  let { artist, title, image_url, gallery, century } = request.body;
  let SQL =
    'INSERT INTO works(artist, title, image_url, gallery, century) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
  let values = [artist, title, image_url, gallery, century];

  return client
    .query(SQL, values)
    .then(result => {
      response.redirect(`/work/${result.rows[0].id}`);
    })
    .catch(handleError);
}

// Error Handler
function handleError(error, response) {
  response.render('pages/error', { error: error });
}

client.connect()
  .then( ()=> {
    app.listen(PORT, ()=> {
      console.log('server and db are up, listening on port ', PORT);
    });
  });
