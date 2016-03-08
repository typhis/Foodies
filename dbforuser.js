var mongoose = require('mongoose');

var momentSchema = new mongoose.Schema({
	//picture : 
	text : {type : String} 
});

var reservationSchema = new mongoose.Schema({
	seat : {type : Number, min : 1},
	reservationDate : {type : Date , default : Date.now},
	commmand : {type : String}
});

var ownedCouponsSchema = mongoose.Schema({
	dishname : {type : String, match : /[a-zA-Z]+$/},
	dishtype : {type : String, match : /[a-zA-Z]+$/},
	//dishpicture :
	reduction : {type : Number},
	deadline : {type : Date, default : Date.now}
});

var restaurantSchema = new mongoose.Schema({
	name : {type : String, match : /[a-zA-Z0-9]+$/},
	location : {type : String, match : /[a-zA-Z]+$/},
	phone : {type : String, match : /[0-9]/, min : 11, max : 11},
	reservation : [reservationSchema],
	ownedCouppons : [ownedCouponsSchema]
});

var friendsSchema = mongoose.Schema({
	friendname : {type : String, match : /[a-zA-Z]+$/},
	friendphone : {type : String, match : /[0-9]/, min : 11, max : 11}
});

var userSchema = new mongoose.Schema({
	username : {type : String, match : /[a-zA-Z0-9-_]+$/, min : 6},
	password : {type : String, match : /[a-zA-Z0-9-_]+$/, min : 8, max :20},
	phonenumber : {type : String, match : /[0-9]+/, min : 11, max : 11},
	tags : {type : String, match : /[a-zA-z,]+$/},
	monments : [momentSchema],
	friends : [friendsSchema],
	restaurant : [restaurantSchema]
});

exports.userModel = mongoose.model('user', userSchema)