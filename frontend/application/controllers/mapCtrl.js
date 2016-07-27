angular.module('pokemonGo')
.controller('mapCtrl', function mapCtrl($scope, $pusher, $http, PUSHER_KEY) {
  /* Set wave as an object to use .push() method */
  $scope.wave = [];

  /* Generate Google Maps */
  $scope.map = { center: { latitude: -22.9083, longitude: -43.1971 }, zoom: 8, markers: [] };

  /* Add Pokémon Spawn Marker */
  function spawnPokemonMap(pokemon) {
    var marker = {
      id: Date.now(),
      coords: {
        latitude: pokemon.latitude,
        longitude: pokemon.longitude
      },
      options: {
        icon: 'http://sprites.pokecheck.org/icon/'+pokemon.id+'.png'
      }
    };
    $scope.map.markers.push(marker);
  };

  /* Pusher App Config for the Frontend */
  var client = new Pusher(PUSHER_KEY);
  var pusher = $pusher(client);
  var map = pusher.subscribe('map');

  /* Listen to the channel and retrieve an action */
  var pokemonName;
  map.bind('spawn', function(pokemon) {
    $scope.wave.push(pokemon);
    spawnPokemonMap(pokemon)
  });
});