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
		console.log(mainCtrl.currentUser);
	});

	mainCtrl.filter = "availableItems";
	mainCtrl.formStatus = false;

	mainCtrl.filterAs = function(filter){
		console.log(filter);
		mainCtrl.filter = filter;
	};

	mainCtrl.loadMapCoor = function(){
		console.log("works");
		initMap();
		updateMap();
	};

	mainCtrl.toggleForm = function(status){
		mainCtrl.formStatus = status;
	};

}]);

//This is the item controller which makes an AJAX call to /posts
//getting all relevant data, which will then be filtered using angular in the view
app.controller('ItemController', ['$http', '$scope', function($http, $scope){
	var itemCtrl = this;
	var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

	itemCtrl.editFormStatus = null;

itemCtrl.showEditForm = function(itemId){
	itemCtrl.editFormStatus = itemId;
};

itemCtrl.editItem = function(item){
	for(var i=0; i < itemCtrl.itemList.length; i ++){
		if(itemCtrl.itemList[i].id === item.id){
			itemCtrl.itemList[i].title = item.title;
			itemCtrl.itemList[i].description = item.description;
		}
	}

	$http.patch('/posts/' + item.id, {
		authenticity_token: authenticity_token,
		post: {
			title: item.title,
			description: item.description
		}
	}).success(function(data){
		console.log('item successfully edited');
	});
};

itemCtrl.deleteItem = function(item){
	console.log(item.id);

	for(var i=0; i < itemCtrl.itemList.length; i++){
		if(itemCtrl.itemList[i].id === item.id){
			console.log(i);
			console.log(itemCtrl.itemList);
			itemCtrl.itemList.splice(i, 1);
			console.log(itemCtrl.itemList);
		}
	}
	$http.delete('/posts/' + item.id, {authenticity_token:authenticity_token}).success(function(data){
		console.log('Deleted!');
	});
};

itemCtrl.getItems = function(){$http.get('/posts').success(function(data){
		itemCtrl.itemList = data.posts;
		console.log(itemCtrl.itemList);
	});
};

//Calls function to make AJAX request to get all posts
itemCtrl.getItems();

//Add item to database
itemCtrl.addItem = function(){
	$scope.$$nextSibling.itemCtrl.itemList.push({
		title:itemCtrl.newItemTitle,
		description:itemCtrl.newItemDescription,
		available: true,
		user_id: $scope.$parent.mainCtrl.currentUser.user_id,
		borrower_id: null,
		id: itemCtrl.itemList.length+1,
	});
	$http.post('/posts', {
		authenticity_token: authenticity_token,
		post: {
			title: itemCtrl.newItemTitle,
			description: itemCtrl.newItemDescription,
			latitude: lat,
			longitude: lng
		}
	}).success(function(data){
		itemCtrl.newItemTitle = ""
		itemCtrl.newItemDescription = ""
		$scope.$parent.mainCtrl.toggleForm(false)
		itemCtrl.getItems();
	});
};

//This is triggered when a user chooses to borrow an item, setting
//their id to the borrower_id of that item, and setting the avialable property
//to false for that item
itemCtrl.borrowItem = function(item){
	newBorrowerId = $scope.$parent.mainCtrl.currentUser.user_id;
	for(var i=0; i < itemCtrl.itemList.length; i ++){
		if(itemCtrl.itemList[i].id === item.id){
			itemCtrl.itemList[i].available = false;
			itemCtrl.itemList[i].borrower_id = newBorrowerId;
		}
	};

	$http.patch('/posts/' + item.id, {
		authenticity_token: authenticity_token,
		post: {
			available: false,
			borrower_id: newBorrowerId
		}
	}).success(function(data){
		console.log('item successfully edited')
	})
};

itemCtrl.returnItem = function(item){
	for(var i=0; i < itemCtrl.itemList.length; i ++){
		if(itemCtrl.itemList[i].id === item.id){
			itemCtrl.itemList[i].available = true;
			itemCtrl.itemList[i].borrower_id = null;
			itemCtrl.itemList[i].comments = [];
		}
	}

	$http.patch('/posts/' + item.id, {
	authenticity_token: authenticity_token,
	post: {
		available: true,
		borrower_id: null,
	}
}).success(function(data){

	$http.delete('/comments/' + item.id, {
		authenticity_token: authenticity_token,
	}).success(function(data){
		console.log('works');
	});


});

};

}]);

app.controller('CommentsController', ['$http', '$scope', function($http, $scope){

	this.createComment = function(){
			var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

		$http.post('/posts/'+$scope.$parent.item.id+'/comments', {
			authenticity_token: authenticity_token,
			comment: {
				post_id: $scope.$parent.item.id,
				comment: this.newComment,
				user_id: $scope.$parent.item.user_id,
				username: $scope.$parent.$parent.$parent.mainCtrl.currentUser.username
			}
		}).success(function(data){
			console.log(data);
			$scope.$parent.$parent.itemCtrl.getItems();
		});
	};

}]);



})();
