# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create([{email: "casey.panzer@gmail.com", username: "cpanzer", password: 123456},{email: "casey@gmail.com", username: "sodell", password: 123456}])

posts = Post.create(
[
	{
		user_id: 1,
		borrower_id: null,
		title: 'bicycle',
		description: 'brand new, 12-speed',
    latitude: 40.738688,
    longitude: -73.993250,
		available: true
	},
	{
		user_id: 2,
		borrower_id: 1,
		title: 'catapult',
		description: 'can hit Russia from Alaska',
    latitude: 40.738688,
    longitude: -73.993250,
		available: false
	},
	{
		user_id: 3,
		borrower_id: 1,
		title: 'iron',
		description: 'works great on t-shirts',
    latitude: 40.738688,
    longitude: -73.993250,
		available: false
	},
	{
		user_id: 1,
		borrower_id: null,
		title: 'ladder',
		description: '25-foot ladder. Works great for saving cats.',
    latitude: 40.738688,
    longitude: -73.993250,
		available: true
	},
	{
		user_id: 1,
		borrower_id: 2,
		title: 'bicycle',
		description: 'brand new, 12-speed',
    latitude: 40.738688,
    longitude: -73.993250,
		available: false
	},
	{
		user_id: 2,
		borrower_id: null,
		title: 'fan',
		description: 'you know, like a paper fan for you face or whatever',
    latitude: 40.738688,
    longitude: -73.993250,
		available: true
	},
	{
		user_id: 3,
		borrower_id: null,
		title: 'air rifle',
		description: 'great for getting rid of pesty critters',
    latitude: 40.738688,
    longitude: -73.993250,
		available: true
	}
]);
