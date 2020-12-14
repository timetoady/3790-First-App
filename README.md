# Games and Game Platforms App

This games app is a sample showcase of some React elements working together. Using it, you can login, either by signing up with your email, password, and URL for an avatar image, or via Facebook or Google.

Once logged in, you can search for your favorite games, and select from the results to add them to your collection or wishlist. You can also go to My Account and view some basic information, send a password reset email, or change your avatar by clicking on your image.

Clicking on any game in your Collection or Wishlist will provide a game description, and allow you remove the game from that list.

Please enjoy GamesApp!

## Features

### Conditional Logic and Array Methods

Several good places for this, but particularly [in Collection](https://github.com/timetoady/3790-First-App/blob/master/src/routes/collection.js) to render search results once they have finished loading. 


### All Functional Components, All the Time

All components functional and act on state using useState hooks.  

### Signup and Login Forms

Both [Signup](https://github.com/timetoady/3790-First-App/blob/master/src/components/Signup.js) and [Login](https://github.com/timetoady/3790-First-App/blob/master/src/components/Dialog.js) forms created, with full validation and required elements marked. Signup takes email, password, password confirmation, and URL. Both use [AuthContext](https://github.com/timetoady/3790-First-App/blob/master/src/contexts/AuthContext.js) to store a local authorized state. (An API context is still in the works!)

### Component side effects

Submission of either Signup or Login causes a login state to mark as authorized, reroutes the user to the [User](https://github.com/timetoady/3790-First-App/blob/master/src/routes/user.js) page, and changes the Menu's Login and Signup buttons to Logout (which triggers logout) and Home.
<!-- ### Sort button

Sorts platforms back and forth between most and least games for that platform using sort.

### Games Search Bar

Don't want to scroll through all those games I like? Use the dynamically filtering search bar to show thing ones on my liked list. Uses hooks to alter the state of the games functional component, applying a filter based on what you type thanks to two way binding. Nifty! 

### A great selection of games!

Not all of these are the best games there are, but they are all good, and have some meaning for me. Feel free to try any of them and tell me what you think.

### Top games grid with nest Accordion 

For those extra tags for each top game. 

### Lazy load, color coded divs 

Lazy load for the older components to save on initial space, and each game div is now color-coded to its platform of origin.

:+1: -->
