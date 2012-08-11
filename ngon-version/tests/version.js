var http = require('http'),
	should = require('should'),
	test = require('./config');

describe('Version Tests: ', function() {
	before(checkServerIsRunning)

	describe('Version', function() {

		it('Create: POST /', function(done) {
			http({
				method: 'POST',
				url: test.url,
				json: true,
				body: JSON.stringify({
					user_id: test.user,
					version: test.version,
					data: test.data
				}),

				function(err, res, body) {
					if (err) {
						done(err)
					} else {
						res.statusCode.should.equal(200)

						//version_id should be a hexadecimal number
						body.should.match(\b0[xX][0 - 9a - fA - F] + \b)

						//make sure we know what version we made for later tests
						test.version_id = body;
						done()
					}
				})
			})
		})

	it('Show: GET /:version_id', function(done) {
		http.get(test.url + '/' + test.version_id, function(err, res, body) {
			if (err) {
				done(err)
			} else {
				//check headers
				res.statusCode.should.equal(200)
				res.should.be.json

				//check the response
				for (var ver in JSON.parse(body)) {
					ver.should.be.a('number');
					body.ver.should.have.property('_id', test.version_id)
					body.ver.should.have.property('user_id', test.user)
					for (var data_key in body.ver.data) {
						body.ver.data_key.data.should.equal(test.data_key.data)
					}
				}

				//verify data is presented
			}
		})
	})
	})
})

function checkServerIsRunning(done) {
	http.get('localhost', function(err, res, body) {
		if (err) {
			done(err)
		} else {
			res.statusCode.should.equal(200)
		}
	})
}