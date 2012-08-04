//require dependencies
var express = require('express');
var mongoose = require('mongoose');
var crypto = require('crypto');

//require the config for express
var config = require('./config');

// require routes
var user = require('./routes/user');

//create express server
var app = express();

//config
config(app);

mongoose.connect('mongodb://' + app.get('db uri'));

//init all routes
user(app);


//listen on port 80
app.listen(80);