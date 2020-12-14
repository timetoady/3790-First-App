# Welcome to GamesApp
###### A React, Material UI, and API call showcase

This games app is a sample showcase of some React elements working together. Using it, you can login, either by signing up with your email, password, and URL for an avatar image, or via Facebook or Google. Inidividual account info is created using Firebase, and user info is stored using Firestore.

Once logged in, you can search for your favorite games via the RAWG Games API, and select from the results to add them to your collection or wishlist. You can also go to My Account and view some basic information, send a password reset email, or change your avatar by clicking on your image.

Clicking on any game in your Collection or Wishlist will provide a game description, and allow you remove the game from that list.

Please enjoy GamesApp!

## Features

### Conditional Logic and Array Methods

Several good places for this, but particularly [in Collection](https://github.com/timetoady/3790-First-App/blob/master/src/routes/collection.js) line 427 to render search results once they have finished loading. 

### All Functional Components, All the Time

All components functional and act on state using useState hooks.  

### Constructed using CLI and NPM

### Context communicated between components

Provided via [API Context](https://github.com/timetoady/3790-First-App/blob/master/src/contexts/APIcontext.js) and [AuthContext](https://github.com/timetoady/3790-First-App/blob/master/src/contexts/AuthContext.js) to pass API data and login data, respectively.

### Custom Components
* [Dialog.js](https://github.com/timetoady/3790-First-App/blob/master/src/components/Dialog.js)
* [Games2.js](https://github.com/timetoady/3790-First-App/blob/master/src/components/Games2.js)
* [Signup.js](https://github.com/timetoady/3790-First-App/blob/master/src/components/Signup.js)
* [about.js](https://github.com/timetoady/3790-First-App/blob/master/src/components/about.js)
* [loadingCircle.js](https://github.com/timetoady/3790-First-App/blob/master/src/components/loadingCircle.js)
* [tabs.js](https://github.com/timetoady/3790-First-App/blob/master/src/components/tabs.js)
* [ui.js](https://github.com/timetoady/3790-First-App/blob/master/src/components/ui.js)

### Signup and Login Forms

Both [Signup](https://github.com/timetoady/3790-First-App/blob/master/src/components/Signup.js) and [Login](https://github.com/timetoady/3790-First-App/blob/master/src/components/Dialog.js) forms created, with full validation and required elements marked. Signup takes email, password, password confirmation, and picture URL. Both use [AuthContext](https://github.com/timetoady/3790-First-App/blob/master/src/contexts/AuthContext.js) to store a local authorized state. 

### Component side effects

Submission of either Signup or Login causes a login state to mark as authorized, reroutes the user to the [User](https://github.com/timetoady/3790-First-App/blob/master/src/routes/user.js) page, and changes the Menu's Login and Signup buttons to Logout (which triggers logout) and Home.

### CSS Animations

When loading [Collection](https://github.com/timetoady/3790-First-App/blob/master/src/routes/collection.js) and [Wishlist](https://github.com/timetoady/3790-First-App/blob/master/src/routes/wishlist.js) tab pages, a quick CSS transition animation fires.

### Connect to server via AuthContext for User Data and API on [API Context](https://github.com/timetoady/3790-First-App/blob/master/src/contexts/APIcontext.js), special API calls to both Gaming API and [Firebase](https://github.com/timetoady/3790-First-App/blob/master/src/lib/firebase.js) imported throughout components.

### Routes governed by React Router

### Hooks in all components and Context API in the form of AuthContext and API Context

### Create your own account, curate you own collection and wishlist, reset your password, change your profile image

A full stack app with modals, full account setup support, and neato features!

### Top games grid with nest Accordion 

For those extra tags for each top game. 


:+1: -->
