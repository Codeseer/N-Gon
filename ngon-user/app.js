//require dependencies
var express = require('express');
var mongoose = require('mongoose');
var crypto = require('crypto');

// require routes
var user = require('./routes/user');

//create express server
var app = express();

//connect to mongoDB
mongoose.connect('mongodb://192.168.1.10/ngon-user');

//express config
app.use(express.bodyParser());

//init all routes
user(app);

//listen on port 80
app.listen(80);