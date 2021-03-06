// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js --> spostato sul services.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'ngOpenFB', 'ui.select', 'ngSanitize', 'ngMessages'])

.run(function($ionicPlatform, ngFB) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if (window.cordova && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //   cordova.plugins.Keyboard.disableScroll(true);
    // }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  ngFB.init({appId: '488758424625718'});

})

.config(function($stateProvider, $urlRouterProvider, $compileProvider, uiSelectConfig) {

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.photos', {
    url: '/photos',
    views: {
      'menuContent': {
        templateUrl: 'templates/photos.html',
        controller: 'PhotosCtrl',
      }
    }
  })

    .state('app.trips', {
      url: '/trips',
      views: {
        'menuContent': {
          templateUrl: 'templates/trips.html',
          controller: 'TripsCtrl',
          // resolve: {
          //   trips: function(TripsService) {
          //     return TripsService.getTrips()
          //   }
          // }
        }
      }
    })

  .state('app.trips/:tripId', {
    url: '/trips/:tripId',
    views: {
      'menuContent': {
        templateUrl: 'templates/trip.html',
        controller: 'TripCtrl',
        resolve: {
          tripRef: function($stateParams, TripsService) {
            return TripsService.getTripRef($stateParams.tripId)
          }
        }
      }
    }
  })

  .state('app.trips/:tripId/friends', {
    url: '/trips/:tripId/friends',
    views: {
      'menuContent': {
        templateUrl: 'templates/friends.html',
        controller: 'FriendsCtrl',
        resolve: {
          tripRef: function($stateParams, TripsService) {
            return TripsService.getTripRef($stateParams.tripId)
          }
        }
      }
    }
  })

  .state('app.trips/:tripId/album', {
    url: '/trips/:tripId/album',
    views: {
      'menuContent': {
        templateUrl: 'templates/photos.html',
        controller: 'AlbumCtrl',
        resolve: {
          tripRef: function($stateParams, TripsService) {
            return TripsService.getTripRef($stateParams.tripId)
          }
        }
      }
    }
  })

  .state('app.trips/:tripId/albumStory', {
    url: '/trips/:tripId/albumChessboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/photos.html',
        controller: 'AlbumChessboardCtrl',
        resolve: {
          tripRef: function($stateParams, TripsService) {
            return TripsService.getTripRef($stateParams.tripId)
          }
        }
      }
    }
  })

  .state('app.trips/:tripId/map', {
    url: '/trips/:tripId/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl',
        resolve: {
          tripRef: function($stateParams, TripsService) {
            return TripsService.getTripRef($stateParams.tripId)
          }
        }
      }
    }
  })

  .state('app.trips/:tripId/camera', {
    url: '/trips/:tripId/camera',
    views: {
      'menuContent': {
        templateUrl: 'templates/camera.html',
        controller: 'CameraCtrl',
        resolve: {
          tripRef: function($stateParams, TripsService) {
            return TripsService.getTripRef($stateParams.tripId)
          }
        }
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/trips');

  //select settings
  uiSelectConfig.theme = 'bootstrap';
  uiSelectConfig.resetSearchInput = true;
  uiSelectConfig.appendToBody = true;

  //whitelist per camera
  //$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile):|data:image\//);

});
