//all the modles for mongoose
var Game = require('../models/game.js');
var User = require('../models/user.js');

exports.create = function(req, res) {
	console.log('--------');
	//var json = Object.keys(req.body);
	json = req.body;

	console.log("creating new user");
	var newUser = new User();

	if(json.username)
	{
		newUser.username = json.username;
		console.log("username = "+json.username);
	}
	if(json.first && json.last)
	{
		newUser.name.first = json.first;
		newUser.name.last = json.last;
		console.log('name = '+ json.first +' '+ json.last);
	}
	if(json.email)
	{
		newUser.email = json.email;
		console.log('email ='+ json.email);
	}

	newUser.save(function (err)
	{
		if(!err)
			res.send(newUser._id);
		else
			res.send(err);
	});
	
	console.log("_id = "+newUser._id);
	console.log('--------');
}

exports.show = function(req, res) {
	User.findById(req.params.id, function(err, doc){
		res.send(JSON.stringify(doc));
	});
}

exports.update = function(req, res) {
}

exports.delete = function(req, res) {
}