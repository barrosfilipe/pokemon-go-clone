/* Initializers */
var express = require('express');
var app = express();
var path = require('path');
var Pusher = require('pusher');

/* Frontend directory */
app.use('/', express.static(__dirname + '/frontend'));

/* Pusher App Config */
var pusher = new Pusher({
  appId: '229494',
  key: 'ccedb8e6498c65d87b88',
  secret: '2fafea90795450dd3e02',
  encrypted: true
});

/* Spawn a new Pokémon to Pusher API */
setInterval(function() { 
  var pokemonId = Math.floor(Math.random() * 151) + 1;
  pusher.trigger('map', 'spawn', {
    'id': pokemonId,
    'latitude': '123',
    'longitude': '456'
  });
  console.log('Pokémon No: '+pokemonId+' has spawned!');
}, 10000);

/* Starting App on http://localhost:3000 */
app.listen(3000, function () {
  console.log('Go to http://localhost:3000');
});