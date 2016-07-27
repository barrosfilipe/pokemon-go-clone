angular.module('pokemonGo')
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('map', {
    url: '/',
    templateUrl: 'application/templates/map.html',
    controller: 'mapCtrl'
  });
});