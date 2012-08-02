var user = require('../controllers/users');

module.exports = function(app) {
	app.post('/user', user.create);	
	app.get('/user/:username', user.show);
	app.get('/user/id/:id', user.show);
	app.get('/user/email/:email', user.show);
}