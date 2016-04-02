var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});
var models = require('../models/database.js');

var restaurant_model = models.restaurantModel;
var info_model = models.infoModel;
var dish_model = models.dishModel;

router.get('/', function(req, res) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		restaurant_model.findOne({
			token: token
		}, function(err, restaurant) {
			if (err) {
				throw err;
			} else if (restaurant) {
				res.json(restaurant);
			}
		});
	}else{
		res.send('This token is empty');
	}
});

router.post('/add_info', urlencodedParser, function(req, res) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		restaurant_model.findOne({
			token: token
		}, function(err, restaurant) {
			if (err) {
				throw err;
			} else if (restaurant) {
				var my_info = new info_model({
					name: req.body.name,
					location: req.body.location,
					tags: req.body.tags
				});
				my_info.save(function(err) {
					if (err) {
						throw err;
					}
				});
				restaurant_model.findByIdAndUpdate(
					restaurant._id, {
						$set: {
							information: my_info
						}
					},
					function(err, restaurant) {
						if (err) {
							console.log(err);
						}
						console.log("name : " + restaurant.information.name);
						res.json({
							name: restaurant.information.name,
							location: restaurant.information.location,
							tags: restaurant.information.tags
						});
					});
			}
		});
	} else {
		res.send("The token is empty");
	}
});

router.get('/get_info', function(req, res) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		restaurant_model.findOne({
			token: token
		}, function(err, restaurant) {
			if (restaurant) {
				res.json(restaurant.information);
			}
		});
	} else {
		res.send('Token is empty');
	}
});

router.post('/add_dish', function(req, res) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		restaurant_model.findOne({
			token: token
		}, function(err, restaurant) {
			if (restaurant) {
				var dishs = restaurant.dish;
				var sign = false;
				for (var i = dishs.length - 1; i >= 0; i--) {
					if (dishs[i].dishname == req.body.dishname) {
						sign = true;
						console.log(sign + req.body.dishname);
					}
				}
				if (sign) {
					res.send('This dish has already exist');
				} else {
					my_dish = new dish_model({
						dishname: req.body.dishname,
						dishtype: req.body.dishtype,
						dishpicture: req.body.dishpicture,
						price: req.body.price
					});
					my_dish.save(function(err) {
						if (err) {
							throw err;
						}
					});
					restaurant_model.findByIdAndUpdate(
						restaurant._id, {
							$push: {
								dish: my_dish
							}
						},
						function(err, restaurant) {
							if (err) {
								throw err;
							}
							res.json(restaurant.dish);
						});
				}
			} else {
				throw err;
			}

		});
	} else {
		res.send('Token is empty');
	}
});

router.get('/get_dishs', function(req, res) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		restaurant_model.findOne({
			token: token
		}, function(err, restaurant) {
			if (restaurant) {
				res.json(restaurant.dish);
			} else {
				res.json({
					message: 'Please log in',
					err: err
				});
			}
		});
	} else {
		res.send('This token is empty');
	}
});

router.post('/remove_dish', urlencodedParser, function(req, res) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		restaurant_model.findOne({
			token: token
		}, function(err, restaurant) {
			if (restaurant) {
				dish_model.remove({
					_id: req.body.id
				}, function(err) {
					if (err) {
						throw err;
					}
				});
				restaurant_model.findByIdAndUpdate(restaurant._id, {
					$pull: {
						"dish": {
							_id: req.body.id
						}
					}
				}, function(err, restaurant) {
					if (err) {
						throw err;
					}
					res.json(restaurant.dish);
				});
			} else {
				throw err;
			}
		});
	} else {
		res.send('Token is empty');
	}
});
module.exports = router;