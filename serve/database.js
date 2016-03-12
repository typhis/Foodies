var mongoose = require('mongoose');

var infoSchema =new mongoose.Schema({
	name : {type :String, match : /[a-zA-Z0-9-_]+$/},
	location : [{
		longitude : {type : String, match : /[0-9.]+$/},
		latitude : {type : String, match : /[0-9.]+$/}
	}],
	phone : {type :String, match : /[0-9]+$/, min : 11, max : 11},
	tags : {type : String, match : /[a-zA-Z]+$/}
});

var momentsSchema = new mongoose.Schema({
	picture : {type : String},//the link of this picture about moments
	text : {type : String}
});

var dishSchema = new mongoose.Schema({
	dishname : {type : String, min : 1},
	dishtype : {type : String},
	dishpicture : {type : String},//the link of this picture about moments
	price : {type : Number, min : 1}
});

var menuSchema = new mongoose.Schema({
	dish : [dishSchema], 
	price : {type : Number, min : 1}
})

var reservationSchema = new mongoose.Schema({
	seat : {type : Number, min : 1},
	reservationData : {type : Date, default : Date.now},
	command : {
		dish : dishSchema,
		menu : menuSchema
	},
	cost : {type : Number, min : 1}
});

var couponsSchema = new mongoose.Schema({
	dish : dishSchema,
	menu : menuSchema,
	cost : {type : Number, min 1},
	reduction : {type : Number, min 1},
	deadline : {type : Date, default : Date.now}
});

var friendsSchema =new mongoose.Schema({
	name : {type : String, match : /[a-zA-Z0-9-_]+$/, min : 6},
	phone : {type : String, match : /[0-9]+$/, min : 11, max : 11}
});

var userSchema = new mongoose.Schema({
	var password : {type : String, match : /[a-zA-Z0-9-_]+$/, min : 6, max : 40},
	information : infoSchema,
	moments : [momentsSchema],
	reservationCoupons : {[
		name : {type : String, match : /[a-zA-Z0-9-_]+$/,min : 6},
		location : [{
			longitude : {type : String, match : /[0-9.]+$/},
			latitude : {type : String, match : /[0-9.]+$/}
		}],
		phone : {type : String, match : /[0-9]+$/, min : 11, max : 11},
		reservations : [reservationSchema],
		ownedCoupons : [couponsSchema]
	]},
	friends : [friendsSchema]
});

var commentaryRateSchema = new mongoose.Schema({
	user : infoSchema,
	date : {type : Date, default : Date.now},
	text : String,
	rate : {type : Number, min : 1, max : 5}
});

couponsSchema.add({
	user : infoSchema,
	comment : [commentaryRateSchema]
});

var logInfoSchema =new mongoose.Schema({
	license : {type : String, match : /[A-Z0-9]+$/, min : 20, max : 30},
	password : {type : String, match : /[a-zA-Z0-9-_]+$/, min : 8, max : 50} 
});

var restaurantSchema = new mongoose.Schema({
	logInfo : logInfoSchema,
	information : infoSchema,
	reservations : [reservationSchema],
	coupons : [couponsSchema],
	commentaryRate : [commentaryRateSchema],
	dish : dishSchema,
	menu : menuSchema
});

exports.infoModel = mongoose.model('info', infoSchema);
exports.momentsModel = mongoose.model('moments', momentsSchema);
exports.dishModel = mongoose.model('dish', dishSchema);
exports.menuModel = mongoose.model('menu', menuSchema);
exports.reservationsModel = mongoose.model('reservations', reservationSchema);
exports.couponsModel = mongoose.model('coupons', couponsSchema);
exports.friendsModel = mongoose.model('friends', friendsSchema);
exports.userModel = mongoose.model('user', userSchema); 
exports.commentaryRateModel = mongoose.model('commentaryRate', commentaryRateSchema);
exports.logInfoModel = mongoose.model('logInfo', logInfoSchema);
exports.restaurantModel = mongoose.model('restaurant', restaurantSchema);
