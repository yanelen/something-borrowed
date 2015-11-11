/** THIS (Immediately Invoked Function Expression) IIFE STORES THE WHOLE APPLICATION
TO AVOID POLLUTING THE GLOBAL SCOPE AND KEEP
 THINGS NICE AND CONTAINED **/

(function(){
var app = angular.module('SomethingBorrowed', ['ngAnimate', 'ngMap']);

//This is the main controller which wraps the entire application
//providing access to the current user, and control over the view
app.controller('MainController', ['$http', function($http){
	var mainCtrl = this;

	$http.get('/session').success(function(data){
		mainCtrl.currentUser = data.current_user;
		console.log(mainCtrl.currentUser);
	});

	mainCtrl.filter = "availableItems";
	mainCtrl.formStatus = false;

	mainCtrl.filterAs = function(filter){
		console.log(filter);
		mainCtrl.filter = filter;

	};

	mainCtrl.toggleForm = function(status){
		mainCtrl.formStatus = status;
	};


	//Once routes are set, GET request to '/session' will set MainController.currentUser = data.currentUser

}]);

//This is the item controller which makes an AJAX call to /posts
//getting all relevant data, which will then be filtered using angular in the view
app.controller('ItemController', ['$http', '$scope', function($http, $scope){
	var itemCtrl = this;
	var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

itemCtrl.getItems = function(){$http.get('/posts').success(function(data){
		itemCtrl.itemList = data.posts;
		console.log(itemCtrl.itemList);
	});
};

//Makes AJAX request to get all posts 
itemCtrl.getItems();

itemCtrl.beginMap = function initMap() {
      console.log('somehting is happening')
         var myLatLng = {lat: 40.738688, lng: -73.993250};
         var map = new google.maps.Map(document.getElementById('map'), {
           zoom: 13,
           center: myLatLng
         });
         var marker = new google.maps.Marker({
           position: myLatLng,
           map: map,
           draggable: true,
         });
         var infowindow = new google.maps.InfoWindow({
           content: "HELLO"
         });
         google.maps.event.addListener(marker, 'dragend', function (evt) {
             console.log(itemCtrl)
             $scope.itemCtrl.lat = evt.latLng.lat();
             $scope.itemCtrl.lng = evt.latLng.lng();
             console.log($scope)
         });
         marker.addListener('click', function() {
           infowindow.open(map, marker);
         });
       };

 itemCtrl.beginMap();



itemCtrl.addItem = function(){
	$http.post('/posts', {
		authenticity_token: authenticity_token,
		post: {
			title: itemCtrl.newItemTitle,
			description: itemCtrl.newItemDescription,
			latitude: $scope.$$nextSibling.itemCtrl.lat.toString(),
			longitude: $scope.$$nextSibling.itemCtrl.lng.toString()
		}
	}).success(function(data){
		console.log("yes!");
		itemCtrl.getItems();
	})
};

}]);



})();
