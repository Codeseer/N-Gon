//create new express app
var app = require('express')();

//config express
require('config')(app);

//connect to database
require('mongoose').connect('mongodb://' + app.get('db uri'));

// setup routes
require('routes/version')(app);

//listen on port 80
app.listen(80);