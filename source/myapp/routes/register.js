var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});

var models = require('../models/database.js');
var encrypt = require('../models/encrypt.js');

var user_model = models.userModel;
var restaurant_model = models.restaurantModel;

router.get('/', function(req, res) {
	res.send("register");
});

router.post('/user_register', urlencodedParser, function(req, res) {
	if (req.body.password == req.body.re_password) {
		user_model.findOne({
			phone: req.body.phoneNumber
		}, function(err, user) {
			if (err) {
				throw err;
			} else {
				if (user) {
					res.send("Please try another phone number, this number has already register, you can log in");
				} else {
					var new_user = new user_model({
						phone: req.body.phoneNumber,
						password: req.body.password
					});
					new_user.save(function(err) {
						if (err) {
							throw err;
						}
						res.send(new_user.phone + "welcome");
					});
				}
			}
		});
	} else {
		res.send("Please confirme the twice password");
	}
});

router.post('/restaurant_register', urlencodedParser, function(req, res) {
	if (req.body.password == req.body.re_password) {
		restaurant_model.findOne({
			license: req.body.license
		}, function(err, restaurant) {
			if (err) {
				res.send(err);
			} else {
				if (user) {
					res.send("Please try another number of license, this license has registered already");
				} else {
					var encryptedPassword = encrypt.cryptPassword(req.body.password, function(err, salt) {
						if (err) {
							throw err;
						}
						console.log("encrypt password");
					});
					var new_restaurant = new restaurant_model({
						license: req.body.license,
						phone: req.body.phoneNumber,
						password: req.body.password
					});
					new_restaurant.save(function(err) {
						if (err) {
							throw err;
						}
						res.send(new_restaurant.license + " Welcome new restaurant!");
					});
				}
			}
		});
	}
} else {
	res.send("Please confirme the twice password");
});

module.exports = router;