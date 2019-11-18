'use strict';

// Application Dependencies
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();
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

app.use(
  methodOverride((request, response) => {
    if (
      request.body &&
      typeof request.body === 'object' &&
      '_method' in request.body
    ) {
      // look in urlencoded POST bodies and delete it
      let method = request.body._method;
      delete request.body._method;
      return method;
    }
  })
);

//ART CONSTRUCTOR

function Art(info) {
  const placeholderImage = 'https://unsplash.com/photos/PbEzsnNLcA4';
  let httpRegex = /^(http:\/\/)/g;

  this.title = info.title ? info.title : 'No title available';
  this.artist = info.artist ? info.authors[0] : 'No artist available';
  this.image_url = info.imageLinks
    ? info.imageLinks.thumbnail.replace(httpRegex, 'https://')
    : placeholderImage;
  this.details = info.details ? info.details : 'No details available';
  this.gallery = info.gallery
    ? info.gallery
    : 'No gallery information available';
  this.century = info.century
    ? info.century
    : 'We do not have this information';
}

//Inserts the selected art work into the database.
//After the data is inserted, it should render the work with /work/:id
app.post('/works', createWork);

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
    .catch(error => handleError(error, response));
}

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('err', err => console.error(err));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
