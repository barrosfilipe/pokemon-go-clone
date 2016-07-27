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
    NgMap, 
    PUSHER_KEY
  ) {
  /* Set wave as an object to use .push() method */
  $scope.wave = [];

  /* Create map $scope */
  NgMap.getMap().then(function(map) {
    $scope.map = map;
  });

  /* Spawn Pokémons in the Map */
  $scope.markers = [];
  function spawnPokemonMap(pokemon) {
    var marker = {
      id: 'marker' + Date.now(),
      pokemonId: pokemon.id,
      coords: {
        latitude: pokemon.latitude,
        longitude: pokemon.longitude
      },
      position: [pokemon.latitude, pokemon.longitude],
      icon: 'http://sprites.pokecheck.org/icon/'+pokemon.id+'.png'
    };
    $scope.markers.push(marker);
  };

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
    $scope.wave.push(pokemon);
    spawnPokemonMap(pokemon)
  });
});