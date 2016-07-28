angular.module('pokemonGo')

.filter('pokemonNumber', function() {
  return function(input) {
    var pokemon_number = input.toString();
    if (pokemon_number.length == 1) {
      return '00' + pokemon_number;
    } else if(pokemon_number.length == 2) {
      return '0' + pokemon_number;
    } else {
      return pokemon_number;
    }
  }
})

.controller('mapCtrl', function mapCtrl(
  $scope,
  $pusher,
  $http,
  $timeout,
  NgMap,
  PUSHER_KEY
  ) {
  /* Set markers as an object to use .push() method */
  $scope.markers = [];

  /* Create map $scope */
  NgMap.getMap().then(function(map) {
    $scope.map = map;
  });

  /* Spanw Pokémons on the Map (MongoDB) */
  var spawnPokemonMapDB = function() {
    $http.get('/api/wave').
    success(function(data) {
      angular.forEach(data, function(marker) {
        if ($scope.markers.indexOf(marker) == -1) {
          $scope.markers.push(marker);
        };
      });
    });
  };

  /* First Pokémon Spawn */
  spawnPokemonMapDB();

  /* Display Pokémon Info Window */
  $scope.displayPokemonInfo = function(e, marker) {
    /* Reset Market Before Call Info */
    $scope.pokemonMarker = null;

    $scope.pokemonMarker = marker.pokemonId;
    $scope.map.showInfoWindow('pokemonInfo', marker.id);
  };

  /* Pusher App Config for the Frontend */
  var client = new Pusher(PUSHER_KEY);
  var pusher = $pusher(client);
  var map = pusher.subscribe('map');

  /* Listen to the channel and retrieve an action */
  var pokemonName;
  map.bind('spawn', function(pokemon) {
    //spawnPokemonMap(pokemon);
    spawnPokemonMapDB();
  });
});