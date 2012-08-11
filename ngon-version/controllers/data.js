//all the modles for mongoose
var Version = require('../models/version'),
	Data = require('../models/data');

exports.show = function(req, res) {

	findData(req.params, showData);

	function showData(err, doc) {
		res.send(doc.data.data);
	}
}

exports.update = function(req, res) {

	findData(req.params, updateData);

	function updateData(err, doc) {
		doc.data.data = req.body.data;
		doc.data.updated_on = Date.now;
		doc.save(function(err) {
			res.send(doc.data.data);
		});
	}
}

function findData(params, callback) {
	if (params.version_id && params.data) {
		Version.findOne({
			_id: version_id,
			data.key: params.data
		}, callback);
	} else if (params.user_id && params.version && params.data) {
		Version.findOne({
			user_id: params.user_id,
			version: params.version,
			data.key: params.data
		}, callback);
	}
}