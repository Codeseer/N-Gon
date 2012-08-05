var version = require('../controllers/version');

module.exports = function(app) {

	//Create
	app.post('/', version.create);	
	
	//Show
	app.get('/:version_id', version.show);
	app.get('/:user_id/:version', version.show);

}