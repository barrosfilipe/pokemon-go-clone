/* App Initialize and Dependencies */
angular.module('pokemonGo', [
  'ui.router',
  'pusher-angular',
  'ngMap',
  'ngLodash',
  'ngStorage'
])

/* Pusher App Key */
.value('PUSHER_KEY', 'ccedb8e6498c65d87b88');