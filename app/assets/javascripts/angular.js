/** THIS (Immediately Invoked Function Expression) IIFE STORES THE WHOLE APPLICATION 
TO AVOID POLLUTING THE GLOBAL SCOPE AND KEEP
 THINGS NICE AND CONTAINED **/

(function(){
var app = angular.module('SomethingBorrowed', []);

app.controller('MainController', function(){
	this.currentUser = "Sebastian";
	this.logOut = function(){
		this.currentUser = null;
	}

	//Once routes are set, GET request to '/session' will set MainController.currentUser = data.currentUser

});




})();



