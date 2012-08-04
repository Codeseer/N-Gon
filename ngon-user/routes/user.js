var user = require('../controllers/user');

module.exports = function(app) {

	//Create
	app.post('/', user.create);	
	
	//Read
	app.get('/:username', user.show);
	app.get('/id/:id', user.show);
	app.get('/email/:email', user.show);
	
	//Update
	app.put('/', user.update);

	//Delete
	app.delete('/', user.delete);

}