var version = require('../controllers/data');

module.exports = function(app) {

	//Read
	app.get('/:version_id/:data', data.show);
	app.get('/:user_id/:version/:data', data.show);
	
	//Update
	app.put('/:version_id/:data', data.update);
	app.put('/:user_id/:version/:data', data.update);
}