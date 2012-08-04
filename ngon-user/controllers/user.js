//all the modles for mongoose
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

	findUser(req.body, updateUser);

	function updateUser(err, doc){
		var userUpdate = req.body.user;
		if (userUpdate.username){			
			doc.username = userUpdate.username;
		}
		if(userUpdate.email){
			doc.email = userUpdate.email;			
		}
		if(userUpdate.name.first){
			doc.name.first = userUpdate.name.first;			
		}
		if(userUpdate.name.last){
			doc.name.last = userUpdate.name.last;
		}

		doc.save(function (err){
			if(!err)
				res.send(JSON.stringify(doc));
			else
				res.send(err);
		});
	}
}

exports.delete = function(req, res) {

	findUser(req.body, deleteUser);

	function deleteUser(err, doc) {
		//just kidding dont actually delete the user, just set them to inactive
		doc.active = false;
		doc.save(function (err){
			if(!err)
				res.send(true);
			else
				res.send(err);
		});
	}
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