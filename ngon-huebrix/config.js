var express = require('express');

module.exports = function(app) {
	
	//default config
	app.configure(function() {
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.set('db uri', '192.168.1.10/ngon-huebrix');
	});

	//developement config
	app.configure('development', function() {
	});

	//testing config
	app.configure('testing', function() {
		app.set('db uri', '192.168.1.10/ngon-huebrix-testing');
	});

	//production config
	app.configure('production', function() {
		app.set('db uri', '');
	});
}