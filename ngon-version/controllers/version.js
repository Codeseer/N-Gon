//all the modles for mongoose
var Version = require('../models/version'),
	Data = require('../models/data');

exports.create = function(req, res) {
	var newVersion = new Version();

	if (req.body.user_id) {
		newVersion.user_id = req.body.user_id;
	}
	if (req.body.version) {
		newVersion.version = req.body.version;
	}
	if (req.body.data) {
		for (key in req.body.data) {
			var newData = new Data();

			newData.key = key;
			newData.data = req.body.data.key;
			newData.updated_on = Date.now;

			newVersion.data.push(newData);
		}
	}

	newVersion.save(function(err) {
		if(err){res.send(err);}
		res.send('success');
	});
};

exports.show = function(req, res) {
	getVersions(req.params, showVersions);

	function showVersions(err, docs) {
		var response_json;
		if(err){
			throw err;
		}
		else if(docs.length>0) {
			console.log(docs);
			response_json.user_id = docs[0].user_id;
			/*
			each doc in the array so
			[{user_id:123, version:1.01, data:{tehdata}},
			{user_id:123, version:1.02, data:{tehdata2}}]
			*/
			docs.foreach(function(element, index){
				var ver = response_json[element.version];
				
				//populate the ver data
				for(var data_element in element.data){
					ver.data_element = element.data.data_element;
				}
			});

			res.send(JSON.stringify(response_json));
		}
		else {
			res.send('no version');
		}
		
	}
};

function getVersions(params, callback) {
	if (params.user_id && params.version) {
		Version
			.where('user_id', params.user_id)
			.where('version')
			.gt(params.version)
			.find(callback);
	}
}