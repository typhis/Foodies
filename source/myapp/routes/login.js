var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});
var jwt = require('jsonwebtoken');

var models = require('../models/database.js');
var encrypt = require('../models/encrypt.js');

var user_model = models.userModel;
var restaurant_model = models.restaurantModel;

router.get('/', function(req, res) {
	console.log('resquest login successfully');
	res.send('login');
});

router.post('/user_login', urlencodedParser, function(req, res) {
	user_model.findOne({
		phone: req.body.phoneNumber
	}, function(err, user) {
		if (err) {
			res.send("Log in error");
		} else if (!user) {
			res.send('Login failure: The name is not registered');
		} else if (user) {
			if (user.password != req.body.password) {
				res.send('Login failure: Incorrect password');
			} else if (user.password == req.body.password) {
				//sign with default (HMAC SHA256)
				var token = jwt.sign(user, 'superSecret', {
					expiresInMinnutes: 2
				});
				user_model.findByIdAndUpdate(user._id, {
					$set: {
						token: token
					}
				}, function(err, user) {
					if (err) {
						throw err;
					}
				});
				res.send("Welcome " + user.license + '  token' + token);
			}
		}
	});
});

router.post('/restaurant_login', urlencodedParser, function(req, res) {
	restaurant_model.findOne({
		license: req.body.license
	}, function(err, restaurant) {
		if (err) {
			res.send("Log in error");
		} else if (!restaurant) {
			res.send('Login failure: The restaurant is not registered');
			console.log("Not find restaurant");
		} else if (restaurant) {
			if (req.body.password == restaurant.password) {
				//sign with default (HMAC SHA256)
				var token = jwt.sign(restaurant, 'superSecret', {
					expiresInMinnutes: 2
				});
				restaurant_model.findByIdAndUpdate(restaurant._id, {
					$set: {
						token: token
					}
				}, function(err, restaurant) {
					if (err) {
						throw err;
					}
				});
				res.send("Welcome " + restaurant.license + '  token' + token);
			} else {
				res.send("Please check your password");
			}
			// var isMatch = encrypt.comparePassword(req.body.password, restaurant.password, function(err, callback) {
			// 	if (err) {
			// 		return callback(err);
			// 	} else {
			// 		return callback(null, isMatch);
			// 	}
			// });
			// if (isMatch) {
			// 	session.restaurant = restaurant;
			// 	res.send('Log in successfully');
			// 	console.log(" successed");
			// } else {
			// 	res.send('Login failure: Incorrect password');
			// }
		}
	});
});

module.exports = router;