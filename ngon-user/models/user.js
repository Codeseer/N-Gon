var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var User = new Schema({
    username: {type: String,index: {unique: true, sparse: true}, trim: true},
    email: {type: String, unique: true, required: true, trim: true, 
    		match: /^.+@.+$/},
    created_on: {type: Date, default: Date.now},
    last_login: {type: Date, default: Date.now},
    last_played: ObjectId,
    name: { first: {type: String, trim: true},
    		last: {type: String, trim: true} },
    games: [ObjectId],
    password: String
});

module.exports = mongoose.model('user', User);