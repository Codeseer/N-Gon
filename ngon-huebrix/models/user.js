var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var User = new Schema({
    ngon_id: {type: ObjectId, unique:true},
    friends: [ObjectId],
    recently_played: [ObjectId],
    credits: Number,
    created_on: Date,
    updated_on: Date
});

module.exports = mongoose.model('user', User);