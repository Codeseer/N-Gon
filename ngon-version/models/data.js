var mongoose = require('mongoose')
   ,Schema = mongoose.Schema;

var Data = new Schema({
	key: String,
	data: String,
	updated_on: {type: Date, default: Date.now}
});

module.exports = mongoose.model('data', Data);