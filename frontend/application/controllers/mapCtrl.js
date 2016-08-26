angular.module('pokemonGo')

.filter('pokemonReplace', function() {
  return function(input) {
    return input
    .replace("♂", "m")
    .replace("♀", "f")
    .replace("’", "")
    .replace(". ", "-");
  };
})

.controller('mapCtrl', function mapCtrl(
  $scope,
  $pusher,
  $http,
  NgMap,
  lodash,
  PUSHER_KEY,
  $timeout,
  $localStorage,
  $sessionStorage
  ) {
  /* Set markers as an object to use .push() method */
  $scope.markers = [];

  /* Create map $scope */
  NgMap.getMap().then(function(map) {
    $scope.map = map;
  });

  /* Spanw Pokémons on the Map (MongoDB) */
  var spawnPokemonMapDB = function() {
    $http.get('/api/wave')
    .success(function(data) {
      /* Add Pokémons (Not Duplicate) */
      angular.forEach(data, function(marker) {
        var found = lodash.find($scope.markers, marker);
        if (!found) {
          $scope.markers.push(marker);
        };
      });

      /* Look for the Expired Pokémons */
      angular.forEach($scope.markers, function(marker) {
        var found = lodash.find(data, { '_id': marker._id });
        if (!found) {
          var expiredPokemonIndex = lodash.findIndex($scope.markers, { '_id': marker._id });
          $scope.markers.splice(expiredPokemonIndex, 1);
        };
      });
    });
  };

  /* First Pokémon Spawn */
  spawnPokemonMapDB();

  /* Display Pokémon Info Window */
  $scope.displayPokemonInfo = function(e, marker) {
    /* Reset Market Before Call Info */
    $scope.infoMarker = marker;
    $scope.pokemonMarker = null;
    $scope.pokemonMarker = marker.pokemonId;
    $scope.pokemonName = marker.pokemonName;
    $scope.pokemonHash = 'pokemonHash' + Date.now();
    $scope.map.showInfoWindow('pokemonInfo', marker.id);
  };

  /* Catch Pokémon Function (jQuery) */
  var myPokemons = [];
  $scope.$storage = $localStorage.$default({ myPokemons: myPokemons });
  $scope.catchPokemon = function(infoMarker, pokemonHash) {
    /* Disable button for a while */
    $('#catchBtn'+pokemonHash).prop('disabled', true);

    /* D20 Dice. Should be higher than 10 to be sucess */
    var d20 = Math.floor(Math.random()*20) + 1;
    console.log(d20);
    
    /* Hide Pokémon to Wobble */
    var hidePokemon = function() {
      $('#'+pokemonHash).hide();
    };

    /* Pokeball Wobble Animation */
    $timeout(hidePokemon, 600)
    .then(function() {
      $('#pokeball'+pokemonHash)
      .removeClass('animated bounceOutUp')
      .addClass('animated infinite wobble');
    });

    /* Throw Pokeball Animation */
    $('#pokeball'+pokemonHash).addClass('animated bounceOutUp');

    /* Trying to Catch the Pokémon */
    var tryingToCatch = function() {
      if (d20 > 10) {
        /* Caught Success! */
        $scope.$storage.myPokemons.push(infoMarker.pokemonId);
        $scope.myPokemons = $scope.$storage.myPokemons;
        $('#pokeball'+pokemonHash)
        .removeClass('animated infinite wobble');
        $('#btnText'+pokemonHash).html('Gotcha !');

        var deleteCaughtPokemon = function() {
          var found = lodash.find($scope.markers, { '_id': infoMarker._id });
          if (found) {
            var caughtPokemon = lodash.findIndex($scope.markers, { '_id': infoMarker._id });
            $scope.markers.splice(caughtPokemon, 1);
          };

          /* Delete from MongoDB on Caught Action */
          $http.post('/api/wave', infoMarker);
        };

        $timeout(deleteCaughtPokemon, 1000);
        
      } else {
        /* Caught Fail! */
        $('#pokeball'+pokemonHash)
        .removeClass('animated infinite wobble');
        $('#'+pokemonHash).show();
        $('#catchBtn'+pokemonHash).prop('disabled', false);
      };
    };

    $timeout(tryingToCatch, 3000)
    .then(function() {
      if ($scope.myPokemons)
        console.log($scope.myPokemons);
    });
  };

  /* Pusher App Config for the Frontend */
  var client = new Pusher(PUSHER_KEY);
  var pusher = $pusher(client);
  var map = pusher.subscribe('map');

  /* Listen to the channel and retrieve an action */
  var pokemonName;
  map.bind('spawn', function(pokemon) {
    spawnPokemonMapDB();
  });
});