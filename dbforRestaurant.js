var mongoose = require('mongoose');

var couponsSchema = mongoose.Schema({
	dish : {type : String, match : /[a-zA-Z]+$/},
	reduction : {type : Number},
	deadline : {type : Date, default : Date.now}
});

var commentaryRateSchema = mongoose.Schema({
	Date : {type : Date, default : Date.now},
	username : {type : String, match : /[a-zA-Z0-9-_]+$/, min : 6},
	text : {type : String},
	rate : {type : Number, min : 1, max : 5}
});

var menuSchema = mongoose.Schema({
	dishname : {type : String, match : /[a-zA-Z]+$/},
	dishtype : {type :String, match : /[a-zA-Z]+$/},
	//dishpicture :
	price : {type : Number, min 1}
})

var restaurantSchema = new mongoose.Schema({
	name : {type : String, match : /[a-zA-Z0-9-_]+$/, min : 6},
	location : {type : String, match : /[a-zA-Z]+$/},
	phone : {type : String, match : /[0-9]+/, min : 11, max : 11},
	tags : {type : String, match : /[a-zA-Z]/},
	coupons : [couponsSchema],
	commentaryRate : [commentaryRateSchema],
	menu : [menuSchema]
});

exports.restaurantModel =  mongoose.model('restaurant', restaurantSchema);