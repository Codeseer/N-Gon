var version = require('../controllers/version');

module.exports = function(app) {

	//Create
	app.post('/', version.create);

	//Show
	app.get('/', function(req,res){
		res.send('ngon-version');
	});
	app.get('/:user_id/:version', version.show);
};