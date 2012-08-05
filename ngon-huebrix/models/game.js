var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var Game = new Schema({
    players: [ObjectId],
    type: String,
    gane_data: String
});

module.exports = mongoose.model('game', Game);