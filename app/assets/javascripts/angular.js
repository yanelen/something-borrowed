/** THIS (Immediately Invoked Function Expression) IIFE STORES THE WHOLE APPLICATION
TO AVOID POLLUTING THE GLOBAL SCOPE AND KEEP
 THINGS NICE AND CONTAINED **/

(function(){
var app = angular.module('SomethingBorrowed', ['ngAnimate']);

//This is the main controller which wraps the entire application
//providing access to the current user, and control over the view
app.controller('MainController', ['$http', function($http){
	var mainCtrl = this;

	$http.get('/session').success(function(data){
		mainCtrl.currentUser = data.current_user;
		console.log(mainCtrl.currentUser)
	})

	mainCtrl.filter = "availableItems";
	mainCtrl.formStatus = false;

	mainCtrl.filterAs = function(filter){
		console.log(filter)
		mainCtrl.filter = filter;

	};

	mainCtrl.toggleForm = function(status){
		mainCtrl.formStatus = status;
	};


	//Once routes are set, GET request to '/session' will set MainController.currentUser = data.currentUser

}]);

//This is the item controller which makes an AJAX call to /posts
//getting all relevant data, which will then be filtered using angular in the view
app.controller('ItemController', ['$http', function($http){
	var itemCtrl = this;

	itemCtrl.getItems = function(){$http.get('/posts').success(function(data){
		itemCtrl.itemList = data.posts
		console.log(itemCtrl.itemList)
	})
}

itemCtrl.getItems()



}]);

})();
