N-Gon Games LLC
===============

ngon-user
---------

The ngon-user module is meant to be a core user data storage backend for all other ngon modules.
This module should never be accesed by user clients but instead by other ngon server applications.
In other words this is the API that the API's will use.

### ngon-user module is responsible for these tasks.

* Interacting with the MongoDB user CRUD
* User data validations
* Only allowing ngon services access the database
* Storing user roles

### ngon-user module is **NOT** responsible for these tasks.

* Managing user sessions
* Storing game specific data
* Rendering HTML views
* Managing user permisions

API
---

### Note

ngon-user accepts both [application/json](http://en.wikipedia.org/wiki/JSON) and [application/x-www-form-urlencoded](http://en.wikipedia.org/wiki/Application/x-www-form-urlencoded#The_application.2Fx-www-form-urlencoded_type) data.

You *must* specify which data protocol you are using in your requests [Content-Type](http://en.wikipedia.org/wiki/MIME#Content-Type) header value.



### CRUD

#### CREATE

To create a new user POST user credentials to the root url of the api.

Accepted post data:

	URL: users.ngon.cc/
	POST data:
		username: "SomeGuy",
		email: "FakeEmail@FakeURL.com",
		password: "ClearTextPassword"
		name: { first: "The", last: "Dude" }

If a value is not specified and note required it will be set to null.
If a value is not specified and *required* the request will respond with an error.






#### READ

GET request accepts username, id, and email as indexes

Accepted GET requests:

	URL: users.ngon.cc/username
	URL: users.ngon.cc/id/5AE56690FDE230BAC
	URL: users.ngon.cc/email/email@example.com

If a user exist the request will return the JSON of the user **NOT INCLUDING** the password.






#### UPDATE

PUT request using username, id, or email

	URL: users.ngon.cc/
	POST data
		username: "UserNumber1",
			user{ username: "NewUsername",
				  email: "NewEmail@New.com" },
		_method: "PUT"

If update is succesful the users JSON is returned with the updated values, otherwise an error is thrown.
If data is not being updated it does not have to be posted.






#### DELETE

DELETE request using username, id, or email

	URL: users.ngon.cc/
	POST data
		username: "UserNumber1",
		_method: "DELETE"

If the delete is succesful the request will return "true", otherwise it will throw an error.