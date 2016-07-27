/* App Initialize and Dependencies */
angular.module('pokemonGo', [
  'ui.router',
  'pusher-angular',
  'uiGmapgoogle-maps'
])

/* Google Maps Config */
.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyB9NmomOBHEAfGVXaOIJXCev3BpcRbEX-Q',
    v: '3',
    libraries: 'weather,geometry,visualization'
  });
})

/* Pusher App Key */
.value('PUSHER_KEY', 'ccedb8e6498c65d87b88');