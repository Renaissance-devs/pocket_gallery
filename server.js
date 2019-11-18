'use strict';

// Application Dependencies
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();
const methodOverride = require('method-override');

// Imported Functions
// const routeHandlers = require('./server_modules/routeHandlers');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Application Middleware
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', getIndex);

app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    // look in urlencoded POST bodies and delete it
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));


function getIndex(request, response) {
  response.render('pages/index');
}

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('err', err => console.error(err));

// Routes
app.get('/searches', search);
app.post('/searches/results', searchResults);

// Callback Functions
function search(request, response){
  response.render('searches')
}

function searchResults(request, response) {
  let url = `https://api.harvardartmuseums.org/object?q=monet&classification=Paintings&apikey=${process.env.ART_API_KEY}`;
  // if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  // if (request.body.search[1] === 'artist') { url += `+inauthor:${request.body.search[0]}`; }
  // if (request.body.search[1] === 'artist') { url += `+inauthor:${request.body.search[0]}`; }
  console.log(url);
  superagent.get(url)
    .then(results => {
      results.body.records.forEach(el => {
        console.log(el.title)
        console.log(el.people[0].name)
        console.log(el.images[0].baseimageurl)
        console.log(el.century)
      })
    })
  // .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
  // .then(results => response.render('pages/searches/show', { searchResults: results }))
  // .catch(errorHandler);
}



app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
