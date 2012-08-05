//all the modles for mongoose
var Version = require('../models/version'),
	Data = require('../models/data');

exports.create = function(req, res) {
	var newVersion = new Version();

	if(req.body.user_id){
		newVersion.user_id = req.body.user_id;
	}
	if(req.body.version){
		newVersion.version = req.body.version;
	}
	if(req.body.data){
		for(key in req.body.data){
			var newData = new Data();

			newData.key = key;
			newData.data = req.body.data.key;
			newData.updated_on = Date.now;

			newVersion.data.push(newData);
		}
	}

	newVersion.save(function(err){
		res.send(newVersion._id);
	});
}

exports.show = function(req, res) {
	findVersion(req.params, showVersion);
	
	function showVersion(err, doc){
		res.send(JSON.stringify(doc));
	}
}

function findVersion(params, callback) {
	if(params.version_id) {
		Version.findById(params.version_id, callback);
	}
	else if(params.user_id && params.version){
		Version.findOne({"user_id": user_id, "version": version}, callback);
	}
}