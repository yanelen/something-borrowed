<!doctype html>
<html ng-app="myapp">
  <head>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=weather,visualization,panoramio"></script>
<script src="http://code.angularjs.org/1.2.25/angular.js"></script>
<script src="https://rawgit.com/allenhwkim/angularjs-google-maps/master/build/scripts/ng-map.js"></script>
<script src="script.js"></script>
<link rel="stylesheet" href="style.css"/>
  </head>
  <body>
<div ng-controller="EventArgumentsCtrl">
  <map zoom="12" center="40.738688, -73.993250">
  </map>
</div>
  </body>
</html>




var app=angular.module('myapp', ['ngMap']);
app.controller('EventArgumentsCtrl', function($scope) {
  var map;
  $scope.$on('mapInitialized', function(evt, evtMap) {
    map = evtMap;
    var marker = new google.maps.Marker({
      position: {
        lat: 40.738688,
        lng: -73.993250
        },
      map: evtMap,
      draggable: true
      });
     google.maps.event.addListener(marker, 'dragend', function(e){
       var lat = e.latLng.lat()
       var lng = e.latLng.lng()
       console.log(lat, lng)
     }) 
    
    });
  });
