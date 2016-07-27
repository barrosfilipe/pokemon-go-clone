angular.module('pokemonGo')
.controller('mapCtrl', function mapCtrl($scope, $pusher, $http, PUSHER_KEY) {
  /* Set wave as an object to use .push() method */
  $scope.wave = [];

  /* Pusher App Config for the Frontend */
  var client = new Pusher(PUSHER_KEY);
  var pusher = $pusher(client);
  var map = pusher.subscribe('map');

  /* Listen to the channel and retrieve an action */
  var pokemonName;
  map.bind('spawn', function(pokemon) {
    $http.get('http://pokeapi.co/api/v1/pokemon/'+pokemon.id).
    success(function(data) {
      pokemonName = data.name.toLowerCase();
    });
    $scope.wave.push(pokemonName);
  });
});