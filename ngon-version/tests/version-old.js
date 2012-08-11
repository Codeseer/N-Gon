var http = require('http'),
	should = require('should'),
	test = require('./config'),
	mongoose = require('mongoose'),
	Version = require('../models/version'),
	Data = require('../models/data');

describe('Server', function() {
	before(checkServerIsRunning);
	before(clearDatabase);

	it('should create version', function(done) {
		
		var post_options=
		{
			method: 'POST',
			url: 'localhost',
			json: true,
			body: JSON.stringify({
				user_id: '12345',
				version: '1',
				data: {
					someData: 'someData'
				}
			})
		};

		var req = http.request(post_options, function(res) {
			res.statusCode.should.equal(200);
			res.setEncoding('utf8');

			var body = '';
			res.on('data', function(chunk) {
				body += chunk;
			});

			res.on('end', function() {
				body.should.equal('success');
				done();
			});
		});

		req.end();

	});

	it('should show all version data for a user', function(done) {
		http.get(test.url + '/' + test.user + '/' + test.version2.num, function(res) {
			
			//check headers
			res.statusCode.should.equal(200);
			res.should.be.json();
			res.setEncoding('utf8');

			//check the response
			var body = '';
			res.on('data', function(chunk) {
				body += chunk;
			});

			res.on('end', function() {
				
				var json_body = JSON.parse(body);
				json_body[test.version1].data.should.equal(test.version1.data);
				json_body[test.version2].data.should.equal(test.version2.data);

				done();

			});
		});
	});

	after(clearDatabase);
});

function checkServerIsRunning() {
	http.get(test.url, function(res) {
		res.statusCode.should.equal(200);
	});
}

function clearDatabase() {
	mongoose.connect(test.db);
	mongoose.connection.db.executeDbCommand( {dropDatabase:1});
}