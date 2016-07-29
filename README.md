# Pokémon Go Clone
### Stack
###### Backend
  - [Node.js](https://nodejs.org)
  - [Express](http://expressjs.com)
  - [MongoDB](https://www.mongodb.com)
  - [Pusher](https://pusher.com)

###### Frontend
  - [AngularJS](https://angularjs.org)
  - [Google Maps API](https://developers.google.com/maps/documentation/javascript)
  - [Lodash](https://lodash.com)
  - [jQuery](https://jquery.com)

### Getting Started
Requires [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com) installed.

#### Follow the steps below
1. Type `cd pokemon-go-clone` , `npm install` and `bower install`

2. Type `mongod` to start MongoDB daemon.

3. Type `npm start` to start the application

2. Go to: [http://localhost:3000](http://localhost:3000) and Gotta Catch 'Em All.

### How it works?

The backend `server.js` has a function `spawnPokemon()` which generates a random `1 ~ 151` number that reference a Pokémon and also generates coordinates where the Pokémon will be spawned on the map and then be triggered to the `Pusher` and saved to the `MongoDB`

When the frontend is loaded retrives the `MongoDB` data which has all spawned Pokémons and asign to the `$scope` to be displayed to users. Each `MongoDB` document has a expiration time which means the maximum time a spawned Pókemon has to be on the map.

### How to catch a Pokémon

Go to map find your favorite Pokémons click on them and will be displayed his information and a button to try to catch. Good luck!