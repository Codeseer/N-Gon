//all the modles for mongoose
var Game = require('../models/game.js');
var User = require('../models/user.js');

exports.create = function(req, res) {
	var newUser = new User();

	if(req.body.username){
		newUser.username = req.body.username;
	}
	if(req.body.name){
		newUser.name.first = req.body.name.first;
		newUser.name.last = req.body.name.last;
	}
	if(req.body.email){
		newUser.email = req.body.email;
	}

	newUser.save(function (err){
		if(!err)
			res.send(newUser._id);
		else
			res.send(err);
	});
}

exports.show = function(req, res) {

	findUser(req.params, showUser);

	function showUser(err, doc){
		res.send(JSON.stringify(doc));
	}
}

exports.update = function(req, res) {

	findUser(req.params, updateUser);

	function updateUser(err, doc){
		if (req.body.username){			
			doc.username = req.body.username;
		}
		if(req.body.email){
			doc.email = req.body.email;			
		}
		if(req.body.name.first){
			doc.name.first = req.body.name.first;			
		}
		if(req.body.name.last){
			doc.name.last = req.body.name.last;
		}
	}
}

exports.delete = function(req, res) {
}

function findUser(params, callback)
{
	if(params.id){
		User.findById(params.id, callback);
	}
	else if(params.username){
		User.findOne({username: params.username}, callback);		
	}
	else if(params.email){
		User.findOne({email: params.email}, callback);		
	}
}