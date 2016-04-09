//manage.js for conveniently testing
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});
var session = require('express-session');

var models = require('../models/database.js');

var user_model = models.userModel;
var restaurant_model = models.restaurantModel;
var setMeal_model = models.setMealModel;
var dish_model = models.dishModel;

router.get('/', function(req, res) {
	console.log('resquest login successfully');
	res.send('Manage server for testing');
});

router.get('/get_all_restaurant', function(req, res) {
	restaurant_model.find(function(err, restaurants) {
		if (err) {
			throw err;
		}
		res.json(restaurants);
	});
});

router.get('/get_all_user', function(req, res) {
	user_model.find(function(err, users) {
		if (err) {
			throw err;
		}
		res.json(users);
	});
});

router.get('/get_all_dish', function(req, res) {
	dish_model.find(function(err, dishs) {
		if (err) {
			throw err;
		}
		res.json(dishs);
	});
});

router.post('/delete_dish', urlencodedParser, function(req, res) {
	dish_model.findByIdAndRemove(req.body.id, function(err,dish){
		if (err) {
			return handleError(err);
		}
		res.send("successfully remove dish" + dish._id);
	});
});

router.get('/get_all_setMeal', function(req, res) {
	setMeal_model.find(function(err, setMeals) {
		if (err) {
			throw err;
		}
		res.json(setMeals);
	});
});

router.post('/delete_user', urlencodedParser, function(req, res) {
	user_model.findByIdAndRemove(req.body.id, function(err,user){
		if (err) {
			return handleError(err);
		}
		res.send("successfully remove user" + user._id);
	});
});

router.post('/delete_setMeal', urlencodedParser, function(req, res) {
	setMeal_model.findByIdAndRemove(req.body.id, function(err,setMeal){
		if (err) {
			return handleError(err);
		}
		res.send("successfully remove set meal" + setMeal._id);
	});
});

router.post('/delete_restaurant', urlencodedParser, function(req, res) {
	restaurant_model.findByIdAndRemove(req.body.id, function(err,restaurant){
		if (err) {
			return handleError(err);
		}
		res.send("successfully remove restaurant" + restaurant._id);
	});
});

module.exports = router;