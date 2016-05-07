var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});
var models = require('../models/database.js');

var user_model = models.user;
var friendModel = models.friends;

router.get('/friends', function(req, res)){
	var saved_token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (saved_token)
	{
		user_model.findOne({
			saved_token : token
		}, function (err, user) {
			if (err){
				throw err
			}
			else if (user) {
				res.json(user.friends)
			}
		});
	}
	else
		res.send("Empty token");
}

router.post('/add-friends', function(req, res)){
	var saved_token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (saved_token)
	{
		user_model.findOne({
			saved_token : token
		}, function (err, user) {
			if (err){
				throw err
			}
			else if (user)
			{
				var friends = user.friends;
				for (int i = 0; i < friends.length; i++)
				{
					if(friends[i].phone == req.body.addedfriend || friends[i].name == req.body.addedfriend)
						res.send("Already in your Friendlist");
				}
				for (int i = 0; i < user.length; i++)
				{
					if (user[i].information.phone == req.body.addedfriend || user[i].information.name == req.body.addedfriend)
					{
						var save_user = user[i];
						break;
					}
				}
				var newfriend = new friendModel({
					userID : save_user.information.userID,
					name : save_user.information.name,
					phone : save_user.information.phone
				});
				newfriend.save(function(err) {
						if (err) {
							throw err;
						}
					});
			}
	}
	else
		res.send("Empty token");
}