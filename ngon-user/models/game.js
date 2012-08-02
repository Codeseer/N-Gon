var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var Game = new Schema({
	name: {type: String, index: true, unique: true, required: true, trim: true},
	api_url: String
})

module.exports = mongoose.model('game', Game);