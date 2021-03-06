var mongoose = require('mongoose');

var infoSchema = new mongoose.Schema({
	name: {type: String, match: /[a-zA-Z0-9-_]+$/},
	location: {type: String, match: /[a-zA-Z]+$/},
	tags: {type: String, match: /[a-zA-Z]+$/}
});

var momentsSchema = new mongoose.Schema({
	userID: mongoose.Schema.Types.ObjectId,
	picture: {type: String}, //the link of this picture about moments
	text: {type: String}
});

var dishSchema = new mongoose.Schema({
	restaurantID: mongoose.Schema.Types.ObjectId,
	dishname: {type: String, min: 1},
	dishtype: {type: String},
	dishpicture: {type: String
	}, //the link of this picture about moments
	price: {type: Number, min: 1}
});

var setMealSchema = new mongoose.Schema({
	restaurantID: mongoose.Schema.Types.ObjectId,
	dish: [dishSchema],
	price: {type: Number, min: 1}
});

var reservationSchema = new mongoose.Schema({
	userID: mongoose.Schema.Types.ObjectId,
	restaurantID: mongoose.Schema.Types.ObjectId,
	seat: {type: Number, min: 1},
	reservationData: {type: Date, default: Date.now},
	command: {
		dish: dishSchema,
		setMeal: setMealSchema
	},
	cost: {type: Number,min: 1}
});

var couponsSchema = new mongoose.Schema({
	userID: mongoose.Schema.Types.ObjectId,
	restaurantID: mongoose.Schema.Types.ObjectId,
	dish: dishSchema,
	setMeal: setMealSchema,
	cost: {type: Number, min: 1},
	reduction: {type: Number, min: 1},
	deadline: {type: Date, default: Date.now}
});

var friendsSchema = new mongoose.Schema({
	userID: mongoose.Schema.Types.ObjectId,
	name: {type: String, match: /[a-zA-Z0-9-_]+$/, min: 6},
	phone: {type: String, match: /[0-9]+$/, min: 11, max: 11}
});

var reservationCouponsSchema = new mongoose.Schema({
	restaurantInfo: infoSchema,
	reservations: [reservationSchema],
	ownedCoupons: [couponsSchema]
});

var userSchema = new mongoose.Schema({
	phone: {type: String, match: /[0-9]+$/, min: 11, max: 11},
	password: {type: String, match: /[a-zA-Z0-9-_]+$/, min: 6, max: 40},
	token: {type: String },
	information: infoSchema,
	moments: [momentsSchema],
	reservationCoupons: [reservationCouponsSchema],
	friends: [friendsSchema]
});

var commentaryRateSchema = new mongoose.Schema({
	userID: mongoose.Schema.Types.ObjectId,
	restaurantID: mongoose.Schema.Types.ObjectId,
	date: {type: Date, default: Date.now},
	text: String,
	rate: {type: Number, min: 1, max: 5}
});

couponsSchema.add({
	user: infoSchema,
	comment: [commentaryRateSchema]
});

var restaurantSchema = new mongoose.Schema({
	license: {type: String, match: /[A-Z0-9]+$/, min: 20, max: 30},
	phone: {type: String, match: /[0-9]+$/, min: 11, max: 11},
	password: {type: String},
	token: {type: String},
	information: infoSchema,
	dish: [dishSchema],
	setMealID: [String],//storage the setMeal's id
	reservations: [reservationSchema],
	coupons: [couponsSchema],
	commentaryRate: [commentaryRateSchema]
});

infoSchema.pre('save', function(next) {
	console.log("Information are saved");
});

exports.infoModel = mongoose.model('info', infoSchema);
exports.momentsModel = mongoose.model('moments', momentsSchema);
exports.dishModel = mongoose.model('dish', dishSchema);
exports.setMealModel = mongoose.model('setMeal', setMealSchema);
exports.reservationsModel = mongoose.model('reservations', reservationSchema);
exports.couponsModel = mongoose.model('coupons', couponsSchema);
exports.friendsModel = mongoose.model('friends', friendsSchema);
exports.userModel = mongoose.model('user', userSchema);
exports.commentaryRateModel = mongoose.model('commentaryRate', commentaryRateSchema);
exports.restaurantModel = mongoose.model('restaurant', restaurantSchema);