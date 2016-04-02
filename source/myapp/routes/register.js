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
	console.log('resquest resister successfully');
	res.send('register');
});

router.post('/user_register', urlencodedParser, function(req, res) {
	console.log('Starting register' + 'loginname : ' + req.body.loginname +
		'     password : ' + req.body.password);
	user_model.findOne({
		loginname: req.body.loginname
	}, function(err, user) {
		if (err) {
			res.send(err);
		} else if (user != null) {
			res.send('Please try another name, this name has exist already');
		} else {
			if (req.body.password != req.body.re_password) {
				res.send('Please confirme the password');
			}
			var new_user = new user_model({
				loginname: req.body.loginname,
				password: req.body.password
			});
			new_user.save(function(err) {
				if (err) {
					throw err;
				}
				console.log('New user has add');
				res.send(req.body.loginname + 'welcome');
			});
		}
	});
});

router.post('/restaurant_register', urlencodedParser, function(req, res) {
	console.log('Starting register' + 'license number : ' + req.query.license +
		'     password : ' + req.query.password +
		'     phone : ' + req.query.phoneNumber);
	restaurant_model.findOne({
		license: req.body.license
	}, function(err, restaurant) {
		if (err) {
			res.send(err);
		} else if (restaurant != null) {
			res.send('Please try another number of license, this license has registered already');
		} else {
			if (req.body.password != req.body.re_password) {
				res.send('Please confirme the password');
			}
			var encryptedPassword = encrypt.cryptPassword(req.body.password, function(err, salt) {
				if (err) {
					throw err;
				}
				console.log('encrypt password');
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
				console.log('New restaurant has add');
				res.send(new_restaurant.license + ' Welcome new restaurant!' + '    ' + new_restaurant.password + '    ' + new_restaurant.phone);
			});
		}
	});
});
module.exports = router;