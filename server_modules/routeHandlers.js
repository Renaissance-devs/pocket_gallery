const superagent = require('superagent');
require('dotenv').config();

// This is where we will write callback functions for routes
function search(request, response){
  response.render('searches')
}
// This is where we will write callback functions for routes

function searchResults(request, response) {
  let url = `https://api.harvardartmuseums.org/object?q=monet&apikey=${process.env.ART_API_KEY}`;
  // if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  // if (request.body.search[1] === 'artist') { url += `+inauthor:${request.body.search[0]}`; }
  superagent.get(url)
  console.log(response.body)
    // .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    // .then(results => response.render('pages/searches/show', { searchResults: results }))
    .catch(errorHandler);
}

// This is where we will add the functions that are ////exported. We will have one of these for each callback
// Example:
// module.exports = myCallback;

module.exports = searchResults;
