//create new express app
var app = require('express')();

//config express
require('./config')(app);
console.log('running express app in NODE_ENV='+process.env.NODE_ENV);
//connect to database
require('mongoose').connect('mongodb://' + app.get('db uri'));
console.log('connected to mongodb instance on '+app.get('db uri'));
// setup routes
require('./routes/version')(app);

//listen on port 80
app.listen(80);