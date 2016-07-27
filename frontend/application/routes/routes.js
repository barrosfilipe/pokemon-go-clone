angular.module('pokemonGo')
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  /* Map Route */
  $stateProvider
  .state('map', {
    url: '/',
    templateUrl: 'application/templates/map.html',
    controller: 'mapCtrl'
  });
});