var user = require('../controllers/user');

var baseUrl = '/user';

module.exports = function(app) {
	app.post(baseUrl, user.create);

	app.get(baseUrl+'/:id', user.show);
	app.get(baseUrl+'/stats/:id', user.show);
	app.get(baseUrl+'/friends/:id', user.show);
	app.get(baseUrl+'/ngon_id/:id', user.show);
	app.get(baseUrl+'/items/:id', user.show);
	app.get
}