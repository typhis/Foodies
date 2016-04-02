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
	res.send('log out');
});

router.post('/user_logout', urlencodedParser, function(req, res) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		user_model.findOne({
			token: token
		}, function(err, user) {
			if (err) {
				throw err;
			} else {
				user_model.findByIdAndUpdate(user._id, {
					$set: {
						token: null
					}
				}, function(err, user) {
					if (err) {
						throw err;
					}
					res.send("Good body   " + user.phone);
				});
			}
		});
	}
});

router.post('/restaurant_logout', urlencodedParser, function(req, res) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		restaurant_model.findOne({
			token: token
		}, function(err, restaurant) {
			if (err) {
				throw err;
			} else {
				restaurant_model.findByIdAndUpdate(restaurant._id, {
					$set: {
						token: null
					}
				}, function(err, restaurant) {
					if (err) {
						throw err;
					}
				});
				res.send("Good bybe  " + restaurant.license);
			}
		});
	}else{
		res.send("This token is empty");
	}
});

module.exports = router;