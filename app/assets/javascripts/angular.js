/** THIS (Immediately Invoked Function Expression) IIFE STORES THE WHOLE APPLICATION 
TO AVOID POLLUTING THE GLOBAL SCOPE AND KEEP
 THINGS NICE AND CONTAINED **/

(function(){
var app = angular.module('SomethingBorrowed', ['ngAnimate']);

//This is the main controller which wraps the entire application
//providing access to the current user, and control over the view
app.controller('MainController', function(){
	this.filter = "availableItems";
	this.currentUser = currentUser;
	this.formStatus = false;

	this.filterAs = function(filter){
		this.filter = filter;
	};

	this.logOut = function(){
		this.currentUser = null;
	};

	this.toggleForm = function(status){
		this.formStatus = status;
	};


	//Once routes are set, GET request to '/session' will set MainController.currentUser = data.currentUser

});

//This is the item controller which makes an AJAX call to /posts
//getting all relevant data, which will then be filtered using angular in the view
app.controller('ItemController', function(){
	this.itemList = items;

});

//This is a placeholder user info while we wait for routes and JSON
var currentUser = {
	username: 'ScubaSteve68',
	user_id: 1
};

//This is a placeholder item info while we wait for routes and JSON
var items = [
	{
		user_id: 1,
		borrower_id: null,
		title: 'bicycle',
		description: 'brand new, 12-speed',
		available: true
	},
	{
		user_id: 2,
		borrower_id: 1,
		title: 'catapult',
		description: 'can hit Russia from Alaska',
		available: false
	},
	{
		user_id: 3,
		borrower_id: 1,
		title: 'iron',
		description: 'works great on t-shirts',
		available: false
	},
	{
		user_id: 1,
		borrower_id: null,
		title: 'ladder',
		description: '25-foot ladder. Works great for saving cats.',
		available: true
	},
	{
		user_id: 1,
		borrower_id: 2,
		title: 'bicycle',
		description: 'brand new, 12-speed',
		available: false
	},
	{
		user_id: 2,
		borrower_id: null,
		title: 'fan',
		description: 'you know, like a paper fan for you face or whatever',
		available: true
	},
	{
		user_id: 3,
		borrower_id: null,
		title: 'air rifle',
		description: 'great for getting rid of pesty critters',
		available: true
	}
]

})();



