/* Initializers */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var Pusher = require('pusher');

/* Ínit Pokémon Get Info */
const pokemonGetInfo = require('pokemon');

/* MongoDB Config */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wave');

/* Models */
var Wave = require('./models/waveModel');

/* Routes */
var routes = require('./routes/routes.js');

/* Express Configs */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../frontend')));
app.use('/api', routes);

/* Pusher App Config */
var pusher = new Pusher({
  appId: '229494',
  key: 'ccedb8e6498c65d87b88',
  secret: '2fafea90795450dd3e02',
  encrypted: true
});

/* Spawn a new Pokémon to Pusher API */
var spawnPokemon = function(generatedPokemonId) {
  var pokemonId = generatedPokemonId;
  var pokemonName = pokemonGetInfo.getName(pokemonId);

  /* Random Coordinates */
  var spawnLatitude = '-22.90' + Math.floor(Math.random() * 999999);
  var spawnLongitude = '-43.18' + Math.floor(Math.random() * 999999);

  pusher.trigger('map', 'spawn', {
    'id': pokemonId,
    'name': pokemonName,
    'latitude': spawnLatitude,
    'longitude': spawnLongitude
  });

  /* Save to MongoDB */
  var wave = new Wave();
  wave.id = 'marker' + Date.now();
  wave.pokemonId = pokemonId;
  wave.pokemonName = pokemonName;
  wave.coords = [{
    latitude: spawnLatitude,
    longitude: spawnLongitude
  }];
  wave.position = [spawnLatitude, spawnLongitude];
  wave.icon = 'http://sprites.pokecheck.org/icon/'+pokemonId+'.png';

  wave.save(function(err) {
    if (!err) { 
      console.log('=> Successfully saved to MongoDB');
    }
  });

  /* Server Real Time Log View */
  console.log('--------------------------------------')
  console.log('=> Pokémon No: '+pokemonId+' has spawned!');
  console.log('=> ' +spawnLatitude);
  console.log('=> ' +spawnLongitude);
}

/* 10 seconds interal to a new Pokémon be spawned */
setInterval(function() {
  spawnPokemon(Math.floor(Math.random()*151) + 1);
}, 10000);

/* Starting App on http://localhost:3000 */
app.listen(3000, function () {
  console.log('Go to http://localhost:3000');
});

module.exports = app;