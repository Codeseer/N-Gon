//require dependencies
var express = require('express');
var mongoose = require('mongoose');

//create express server
var app = express();

//config express
require('./config')(app);

// setup routes
require('./routes/user')(app);
require('./routes/game')(app);

//connect to database
mongoose.connect('mongodb://' + app.get('db uri'));

//listen on port 80
app.listen(80);