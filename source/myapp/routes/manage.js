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

router.post('/delete_restaurant', urlencodedParser, function(req, res) {
	restaurant_model.remove(function(err, restaurant) {
		if (err) {
			throw err;
		}
		restaurant_model.findById(req.body.id, function(err, restaurant){
			res.send('req.body.id = ' + req.body.id + '  successfully delete');
		});
	});
});

module.exports = router;