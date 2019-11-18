# User Stories
***
1. As a user, I want my application to load quickly so that I have an enjoyable experience.
- Given that a user opens the application in the browser
When the user navigates to the home page
Then the index should load without a flash of unstyled content (FOUC)
***
2. As a user, I want to search the HARVARD ART MUSEUM API so that I can view the results of my search.
- Given that the user enters a search query
When the user submits the search form
Then the search query should be included in a request to the Harvard Art Museum API
***
3. As a user, I want to be able to browse the search results.
- Given that the user enters a seach query
When the user submits the search form
Then ____ works of art should be displayed to the user
***
4. As a user, I want to view any error messages that occur during the usage of my art list application so that I know if something has gone wrong.
- Given that the application is not functioning properly
When an error occurs
Then the user should receive feedback that something has gone wrong
***
5. As a user, I want a simple, mobile first, UI so that my application is easy to navigate.
- Given that users access the application on multiple platforms
When the user views the application
Then the interface should deliver CSS to the browser
***
6. As a user, I want all of my saved art to be displayed on the home page so that I can view all of the works of art from my gallery in a single view.
- Given that a user opens the application in the browser
When the user navigates to the home page
Then all of the books saved in their gallery should be rendered on the page
***
7. As a user, I want to request information about a single work of art so that I can view its additional details and share it by URL.
- Given that a user views the art gallery
When the user clicks on a "View details" button for an individual work of art
Then the application should take the user to a art detail page where the art's details—including: _________________________________—will be displayed
- Given that a user is viewing the details of a single work of art
When the user clicks on a menu button
Then the user will be returned to the main page where all of the art from the gallery are rendered
***
8. As a user, I want the ability to change details of a single work of art from the search results so that I can write in my custom details and assign the artwork to my gallery.
- Given that a user views search results including art with details they want to edit
When the user clicks on a button to select a work of art
Then the user should view a form to modify the details of the selected art work
***
9. As a user, I want the ability to add new art to my application so that my gallery continues to grow.
- Given that a user would like to expand their gallery
When the user clicks on a button to add art to the database
Then the user should submit the form to add a new work of art
***
10. As a user, I want the application to be designed in a consistent way so that I do not experience any down time or slow load times.
- Given that a user views the application
When the user interacts with the application
Then the application should load quickly and perform efficiently
***
11. As a user, I want to update the details of a work of art so that it displays the way I want it to, according to my personalized preferences.
- Given that the user on an art detail page would like to update the information stored for the art
When the user clicks on the "Update Details" button
Then the form containing the details should be revealed
- Given that the user updates art details in the edit form
When the user clicks on the "Update Art" button
Then the user-provided details for that art should be saved in the database
***
12. As a user, I want to remove art from my gallery so that it accurately represents art that is most meaningful and impactful to me.
- Given that a user on the art detail page would like to remove art from the gallery
When the user clicks on the "Delete Art" button
Then the art should be removed from the gallery
