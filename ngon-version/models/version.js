var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId
   ,Data = require('data');

var Version = new Schema({
	user_id: {type: ObjectId, index: true, require: true},
	version: {type: Number, require: true},
	data: [Data.schema],
	created_on: {type: Date, default: Date.now}
});

Version.index({user_id: 1, version: 1}, unique:true);

module.exports = mongoose.model('version', Version);