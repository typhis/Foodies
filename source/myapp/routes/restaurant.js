var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});
var jsonParser = bodyParser.json();
var models = require('../models/database.js');

var restaurant_model = models.restaurantModel;
var info_model = models.infoModel;
var dish_model = models.dishModel;
var setMeal_model = models.setMealModel;

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
	} else {
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
						res.json(restaurant.information);
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
					var my_dish = new dish_model({
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

router.post('/add_setMeal', jsonParser, function(req, res) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		if (!req.body) {
			res.send("json is empty");
		} else {
			restaurant_model.findOne({
				token: token
			}, function(err, restaurant) {
				if (err) {
					throw err;
				} else {
					if (restaurant) {
						var new_setMeal = new setMeal_model({
							restaurantID: restaurant._id,
							price: req.body.price
						});
						for (var i = 0; i < req.body.dishs.length; i++) {
							new_setMeal.dish.push({
								dishname: req.body.dishs[i].dishname,
								dishpicture: req.body.dishs[i].dishpicture,
								dishtype: req.body.dishs[i].dishtype,
								price: req.body.dishs[i].price
							});
							new_setMeal.save(function(err) {
								if (err) {
									return handleError(err);
								}
							});
						}
						restaurant_model.findByIdAndUpdate(restaurant._id, {
							$push: {
								setMealID: new_setMeal._id
							}
						}, function(err, restaurant) {
							if (err) {
								throw err;
							}
							res.json(restaurant.setMealID);
						});
					} else {
						res.send("The restaurant is empty");
					}
				}
			});
		}
	} else {
		res.send("The token is empty");
	}
});

router.get('/get_setMeal', urlencodedParser, function(req, res) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		restaurant_model.findOne({
			token: token
		}, function(err, restaurant) {
			if (err) {
				return handleError(err);
			} else {
				if (restaurant) {
					setMeal_model.find({
						restaurantID: restaurant._id
					}, function(err, setMealList) {
						if (err) {
							return handleError(err);
						}
						res.json(setMealList);
					});
				}
			}
		});
	} else {
		res.send("This token is empty");
	}
});

router.post('/remove_setMeal', urlencodedParser, function(req, res) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		restaurant_model.findOne({
				token: token
			},
			function(err, restaurant) {
				if (restaurant) {
					//remove from setMeal 
					setMeal_model.remove({
							_id: req.body.id
						},
						function(err) {
							if (err) {
								throw err;
							}
						});
					//remove from restaurant
					restaurant_model.findByIdAndUpdate(restaurant._id, {
						$pull: {
							setMealID: req.body.id
						}
					}, function(err, restaurant) {
						if (err) {
							return handleError(err);
						}
						res.json(restaurant.setMealID);
					});
				} else {
					return handleError(err);
				}
			});
	} else {
		res.send("This token is empty");
	}
})

var FindRestaurantByCity = function(allRestaurant, city)
{
	var newRestaurantArray;
	var i  = 0;

	while (i < allRestaurant.length)
	{
		if (allRestaurant[i].information.location == city)
			newRestaurantArray.push(allRestaurant[i]);
		i++;
	}
	return newRestaurantArray;
}

var FindRestaurantByName = function(allRestaurant, name)
{
	var newRestaurantArray;
	var i  = 0;

	while (i < allRestaurant.length)
	{
		if (allRestaurant[i].information.name == name)
			newRestaurantArray.push(allRestaurant[i]);
		i++
	}
	return newRestaurantArray;
}

var FindRestaurantByTags = function(allRestaurant, tags)
{
	var newRestaurantArray;
	var i  = 0;

	while (i < allRestaurant.length)
	{
		if (TagsArePresent(allRestaurant[i].information.tags, tags))
			newRestaurantArray.push(allRestaurant[i]);
		i++;
	}
	return newRestaurantArray;
}

var TagsArePresent = function(RestaurantTags, TagsToFind)
{
	var i = 0;

	while (i < TagsToFind.length)
	{
		var j = 0;
		while (j < RestaurantTags.length)
		{
			if (RestaurantTags[j] == TagsToFind[i])
			{
				i++;
				break;
			}
			if (j == (RestaurantTags.length - 1))
				return false;
			j++;
		}
	}
	return true;
}


router.get('/get_restaurant', urlencodedParser, function(req, res) {
	var allRestaurant = restaurant_model.find();
	switch (req.query)
	{
		case(req.query.city != null) :
			allRestaurant = FindRestaurantByCity(allRestaurant, req.query.city);
		case(req.query.Name != null) :
			allRestaurant = FindRestaurantByName(allRestaurant, req.query.Name);
		case (req.query.tags) :
			allRestaurant = FindRestaurantByTags(allRestaurant, req.query.tags);
			break;
		default : 
			break;
	}
	for (int i = 0; i < allRestaurant.length; i++)
	{
		allRestaurant[i].password = "";
		allRestaurant[i].token = "";
	}

	res.json(allRestaurant);
});

module.exports = router;