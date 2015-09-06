angular

.module('starter.controllers', ['ngCordova'])

.service('TripsService', function($q) {
  return {
    trips: [{
        title: 'Capodanno Amsterdam',
        id: 0,
        where: 'Amsterdam, Paesi Bassi',
        from: '2014-12-31', to: '2015-01-03',
        img: '/img/amsterdam.jpg',
        friends: [
          {id:0, admin:true},
          {id:1, admin:false},
        ],
        album: [
          {
            id:0,
            title: 'Tramonto',
            descr:'tramonto sui canali',
            by: {id: 1},
            date:'2015-01-01',
            img: '/img/amsterdam1.jpg',
            geotag: { lat: 52.3717158, lng: 4.8916142 },
            tags: ['tramonto', 'città']
          },
          {
            id:1,
            title: 'Test Title',
            descr:'descrizione test',
            by: {id: 1},
            date:'2015-01-02',
            img: '/img/amsterdam2.jpg',
            geotag: { lat: 52.3749158, lng: 4.8986142 },
            tags:['città'],
          },
        ],
      },
      {
        title: 'Vacanze Romane',
        id: 1,
        from: '2014-08-10', to: '2014-08-11',
        where: 'Roma, Italia',
        img: '/img/roma.jpg',
        friends:
          [
            {id:0, admin:true},
            {id:1, admin:false},
            {id:2, admin:false},
          ],
          album: [
            {
              id:0,
              title: 'Tramonto',
              descr:'tramonto sul tevere',
              by: {id: 0},
              date:'2014-08-10',
              img: '/img/roma1.jpg',
              geotag: { lat: 41.9100711, lng: 12.5369979 },
              tags:['tramonto', 'città eterna'],
            },
            {
              id:1,
              title: 'Test',
              descr:'descrizione test',
              by: {id: 3},
              date:'2014-08-11',
              img: '/img/roma2.jpg',
              geotag: { lat: 41.9127711, lng: 12.5351979 },
              tags:[],
            },
            {
              id:3,
              title: 'Test',
              descr:'descrizione test',
              by: {id: 3},
              date:'2014-08-11',
              img: '/img/roma3.jpg',
              geotag: { lat: 41.9119711, lng: 12.5325979 },
              tags:[],
            },
          ],
      },
    ],

    friends: [
      { id: 0, name: 'Claudia',   surname: 'Cassano', installed: true, other: "blablabla", img: '/img/anonimo.png'},
      { id: 1, name: 'Gianmaria', surname: 'Leoni',   installed: true, other: "blablabla", img: '/img/anonimo.png'},
      { id: 2, name: 'Alberto',   surname: 'Leoni',   installed: false, other: "blablabla", img: '/img/anonimo.png'},
      { id: 3, name: 'Pinco',     surname: 'Pallino', installed: true, other: "blablabla", img: '/img/anonimo.png'},
    ],


    getTrips: function() {
      return this.trips
    },
    getTrip: function(tripId) {
      //var dfd = $q.defer()
      var __trip;
      this.trips.forEach(function(trip) {
        if (trip.id === parseInt(tripId)) {
          __trip = trip //dfd.resolve(trip)
        }
      })
      return __trip;
      //return dfd.promise
    },
    getFriends: function() {
      return this.friends
    },
    getTripFriends: function(tripId) {
      var __trip;
      this.trips.forEach(function(trip) {
        if (trip.id === parseInt(tripId)) {
          __trip = trip
        }
      })
      return __trip.friends;
    },
    getFriendDetail: function(friend) {
      friends = this.friends;
      for (var i = 0; i < friends.length; i++) {
        if (friends[i].id === friend.id ) {
          return friends[i];
        }
      }
    },
    getFriendsDetail: function(tripFriends) {
      friends = this.friends;
      tripFriends.forEach(function(friend, index, tf){
        for (var i = 0; i < friends.length; i++) {
          if (friends[i].id === friend.id ) {
            //friend = friends[i];
            tf[index] = friends[i];
          }
        }
      })
      return tripFriends;
    },
    getTripFriendsDetail: function(trip, friends){
      tripFriends = trip.friends
      trip.friends = [];
      friends.forEach(function(friend){
        trip.friends.push(angular.copy(friend));
        trip.friends[trip.friends.length - 1].admin = false;
        for (var i = 0; i < tripFriends.length; i++) {
          if (tripFriends[i].id === friend.id) {
            trip.friends[i].admin = tripFriends[i].admin;
            trip.friends[i].checked = true;
            break;
          }else{
            //trip.friends[i].checked = false;
          }
        }
      });
      trip.inited = true;
      return trip
    },
    getPhotoDetail: function(album, friends){
      album.forEach

      album.inited = true;
      return trip
    },
    localSaveTrip: function (trip){
      //salva un trip nella local storage
    },
    localGetTrips: function(){
      //riprende tutti i trip dalla local storage
    },
    localGetFriends: function(){
      //riprende tutti gli amici dalla local storage
    }

  }
})

.factory('InitService', function() {
	var hasInited = false;
	return hasInited;
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('TripsCtrl', function($scope, trips) {
  $scope.trips = trips;

})

.controller('TripCtrl', function($scope, $stateParams, TripsService){

  $scope.trip = TripsService.getTrip($stateParams.tripId);
  $scope.friends = TripsService.getFriends();

  //se il trip è già stato inizializzato non re-inizializzare
  if(! $scope.trip.inited ) TripsService.getTripFriendsDetail($scope.trip, $scope.friends);

})

.controller('FriendsCtrl', function($scope, $stateParams, TripsService, $timeout){

  $scope.trip = TripsService.getTrip($stateParams.tripId);
  $scope.friends = TripsService.getFriends();

  //se il trip è già stato inizializzato non re-inizializzare
  if(! $scope.trip.inited ) TripsService.getTripFriendsDetail($scope.trip, $scope.friends);

  //refresha la lista di amici
  $scope.doRefresh = function() {
    // $http.get('/new-items')
    //  .success(function(newItems) {
    //    $scope.items = newItems;
    //  })
    //  .finally(function() {
    //    // Stop the ion-refresher from spinning
    //    $scope.$broadcast('scroll.refreshComplete');
    //  });

    //simula il reload degli amici
    $timeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);

  };

})

.controller('AlbumCtrl', function($scope, $stateParams, TripsService, $cordovaSocialSharing){

  $scope.trip = TripsService.getTrip($stateParams.tripId);
  $scope.album = angular.copy($scope.trip.album);

  for (var i = 0; i < $scope.album.length; i++) {
    $scope.album[i].by = TripsService.getFriendDetail($scope.album[i].by);
  }

  $scope.shareAnywhere = function() {
    $cordovaSocialSharing.share("This is your message", "This is your subject", "www/img/amsterdam.png", "http://www.google.com");
  }

  $scope.shareViaTwitter = function(message, image, link) {
    $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
      $cordovaSocialSharing.shareViaTwitter(message, image, link);
    }, function(error) {
      alert("Cannot share on Twitter");
    });
  }



})

.controller('MapCtrl', function($scope, $ionicLoading, $compile, $stateParams, TripsService) {
  $scope.trip = TripsService.getTrip($stateParams.tripId);
  $scope.album = angular.copy($scope.trip.album);

  for (var i = 0; i < $scope.album.length; i++) {
    $scope.album[i].by = TripsService.getFriendDetail($scope.album[i].by);
  }

  // $scope.loading = $ionicLoading.show({
  //   template: '<ion-spinner icon="lines"></ion-spinner>',
  //   noBackdrop: true,
  // });


  function initialize() {
    var myLatlng = new google.maps.LatLng(0,0);

    var mapOptions = {
      center: myLatlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map'),mapOptions);


    //Marker + infowindow + angularjs compiled ng-click
    var infowindow = new google.maps.InfoWindow();
    var contentString;
    var compiled;


    //centra la mappa nel luogo della prima foto
    map.panTo($scope.trip.album[0].geotag);

    //inizializza Markers e InfoWindow
    $scope.trip.album.forEach(function(photo, index){

        marker = new google.maps.Marker({
          position: photo.geotag,
          map: map,
          title: photo.title,
       });

       google.maps.event.addListener(marker, 'click', (function(marker,index) {
         return function(){
           contentString =  //"<div><a ng-click='clickTest()'>Click me!</a>" +
                            "<div class='list card'>" +
                              "<div class='item no-border' >{{album[" + index + "].title}}</div>" +
                              "<div class='item item-image padding-horizontal no-border'><img style='/*height:50px;*/' ng-src='{{album[" + index + "].img}}'></div>" +
                              "<div class='item  item-avatar no-border' >" +
                                "<img ng-src='{{album[" + index + "].by.img}}'>" +
                                "<h2>Pic by {{album[" + index + "].by.name}} {{album[" + index + "].by.surname}}</h2>" +
                                "<p>{{album[" + index + "].date | date: 'dd/MM/yyyy'}}</p>" +
                                "<p>{{album[" + index + "].descr}}</p>" +
                              "</div>" +
                            "</div>";

          compiled = $compile(contentString)($scope);
          infowindow.setContent(compiled[0]);
          infowindow.open(map,marker);
        }
      })(marker, index));

    })


    $scope.map = map;
  }


  //inizializza la mappa quando entri nella pagina
  initialize();

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      //content: 'Getting current location...',
      //showBackdrop: false
      template: '<ion-spinner icon="lines"></ion-spinner><br>Getting current location...',
      noBackdrop: true,
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      //$scope.loading.hide(); --> deprecato
      $ionicLoading.hide()
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  $scope.clickTest = function() {
    alert('Example of infowindow with ng-click')
  };
});
