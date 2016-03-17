var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});
var session = require('express-session');

var path = require('path');

var models = require('../models/database.js');

var user_model = models.userModel;
var restaurant_model = models.restaurantModel;

router.get('/', function(req, res) {
	console.log('resquest login successfully');
	res.render('login', {
		title: 'Log in'
	});
});

router.post('/user_login', urlencodedParser, function(req, res) {
	user_model.findOne({
		loginname: req.body.loginname
	}, function(err, user) {
		if (err) {
			res.send("Log in error");
		} else if (!user) {
			res.send('Login failure: The name is not registered');
			console.log(" not find user");
		} else if (user.password != req.body.password) {
			res.send('Login failure: Incorrect password');
		} else if (user.password == req.body.password) {
			session.user = user;
			res.redirect('http://localhost:3000');
			console.log(" successed");
		}
	});
});

router.post('/restuarant_login', urlencodedParser, function(req, res) {
	restaurant_model.findOne({
		license: req.body.license
	}, function(err, restaurant) {
		if (err) {
			res.send("Log in error");
		} else if (!restaurant) {
			res.send('Login failure: The restaurant is not registered');
			console.log("Not find restaurant");
		} else if (restaurant.password != req.body.password) {
			res.send('Login failure: Incorrect password');
		} else if (restaurant.password == req.body.password) {
			session.restaurant = restaurant;
			res.redirect('http://localhost:3000');
			console.log(" successed");
		}
	});
});

module.exports = router;