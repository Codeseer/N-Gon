var user = require('../controllers/users');

module.exports = function(app) {
	app.post('/user', user.create);
	app.get('/user/:id', user.show);
}