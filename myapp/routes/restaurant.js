var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});
var session = require('express-session');
var models = require('../models/database.js');

var restaurant_model = models.restaurantModel;
var info_model = models.infoModel;
var dish_model = models.dishModel;
  
restaurant_model.findOne({
	restaurantame: 'Elodie'
}, function(err, restaurant) {
	session.restaurant = restaurant;
});

/* GET restaurants listing. */
router.get('/', function(req, res) {
	res.render('restaurant', {
		title: 'restaurant add information'
	});
});

//======= Add restaurant =======//
router.post('/res_add_info', urlencodedParser, function(req, res) {
	if (session.restaurant != null) {
		var my_info = new info_model({
			name: req.body.name,
			location: req.body.location,
			phone: req.body.phone,
			tags: req.body.tags
		});
		my_info.save(function(err) {
			if (err) {
				throw err;
			}
		});
		restaurant_model.findByIdAndUpdate(
			session.restaurant._id, {
				$set: {
					"information": my_info
				}
			},
			function(err, model) {
				if (err) {
					console.log(err);
				}
				console.log("name : " + session.restaurant.information.name);
			});
		res.send("My information was added!");
	} else {
		res.send("Please log in");
	}
});

router.get('/res_get_myinfo', urlencodedParser, function(req, res){
	if (session.restaurant) {
		
	}
})

//I think the restaurant's information is necessary, so I detele this function
// router.post('res_remove_info', urlencodedParser, function(req, res) {
// 	if (!session.restaurant) {
// 		var remove_info = session.restaurant._id(id).remove();
// 		session.restaurant.save(function(err) {
// 			if (err) {
// 				return handleError(err);
// 			}
// 			console.log("The restaurant's information was remove");
// 		});
// 		res.send('Information had been removed')
// 	} else {
// 		res.send("Please log in");
// 	}
// });

router.post('/res_add_dish', function(req, res) {
	if (session.restaurant != null) {
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
			session.restaurant._id, {
				$push: {
					"dish": my_dish
				}
			},
			function(err, model) {
				console.log(err);
			});
		res.send("Dish had was added!");
	} else {
		res.send("Please log in");
	}
});

router.post('/res_remove_dish', urlencodedParser, function(req, res) {
	if (session.restaurant != null) {
		var idToRemove = req.body.dishID;
		dish_model.remove({
			_id: idToRemove
		}, function(err) {
			if (err) {
				return handleError(err);
			}
		});
		restaurant_model.findByIdAndUpdate(session.restaurant._id, {
			$pull: {
				"dish": {
					_id: idToRemove
				}
			}
		}, function(err, model) {
			console.log(err);
		});
		res.send('Dish had been removed');
	} else {
		res.send("Please log in");
	}
});

var dishs;
router.get('/res_get_dishs', function(req, res) {
	if (session.restaurant != null) {
		dishs = session.restaurant.dish;
		for (var i = dishs.length - 1; i >= 0; i--) {
			console.log('dish : ' + dishs[i] + "is " + dishs[i].dishname);
		}
		res.send('restaurant');
	} else {
		res.send("Please log in");
	}
});

module.exports = router;