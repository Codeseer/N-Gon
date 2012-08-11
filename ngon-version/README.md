N-Gon Games LLC
===============

ngon-version
------------

ngon-version module allows for forward compatible storing of game data on the ngon servers. All data the server stores is considered a string, in this way the server stays agnostic to the data which will allow a client game to store anything from JSON to serialized game objects.

### Concept

A Version is essentially a data encapsulator. Which means it holds data specific to that version of a game.
So if version 0.2 added a new data value to the game that data would be stored away from the old data, so if the player began playing on a older version of the game the server would only send down the data that the version of the game he/she was playing could understand.

Here is an example of what a request for **all** user data might look like in two diffrent versions of the game.


Game client using version 1.0.1

	{
		user_id: 12345,
		1.01: {
			'items': {
				'Sword Of Holding': {
					'dammage': 12,
					'durability': 100,
					'weight': 10
				},
				'Leather Belt': {
					'strength': 4,
					'stamina': 4
				}
			},
			'achievements': {
				'Killed the Ogre': true,
				'Pillaged the Town': false,
				'Saved the Day': false,
				'Far Too Stronk': true
			}
		}
	}

Game client using version 1.2.0

	{
		user_id: 12345,
		1.01: {
			'items': {
				'Sword Of Holding': {
					'dammage': 12,
					'durability': 100,
					'weight': 10
				},
				'Leather Belt': {
					'strength': 4,
					'stamina': 4
				}
			},
			'achievements': {
				'Killed the Ogre': true,
				'Pillaged the Town': false,
				'Saved the Day': false,
				'Far Too Stronk': true
			}
		}
		1.2: {
			'achievements': {
				'Updated to Version 1.2.0': true,
				'A new Achievemnt': false
			},
			'statistics': {
				'Monsters Killed': 143,
				'Deaths': 18,
				'Hours Played': 122,
				'Average Playtime': 1,
				'Distance Traveled': 127020593,
				'Derps': 2
			}
		}
	}

As you can see version 1.2.0 returned the data 'statistics' and all the achievments that are new to version 1.2.0.
This was because the user was on a client using version 1.2.0 and requested all data up to that point.
Any data beyond above that version is meaningless to the client because it does not know what to do with it.

Note that the data stored is a string and is not limited to JSON.

In this example we are storing serialized objects.

	{
		user_id: 12345,
		1.01: {
			'items': '63687569396469397539686376396675627668627539666e62663039756e62666e39666266',
			'achievments': '64676873617a6e686a7466796a7466726e68796a746672'
		}
		1.2: {
			'achievments': '138g8dyf8fg0deyge8tyg80edt0yg0yet8egye',
			'statistics': 'df89bgtf809y8y0degtytgygu0tut0g0gtf0bh0tfryudgtf0fr0yu0detfrg'
		}
	}

This is will obviously be handled a bit differntly by the client since it will have to deserialize both the 1.0.1 achievments object and the 1.2.0 achievements object and combine them.

By storing data in this way the server stays agnostic to the data and keeps all game logic on the client.

### API

#### CREATE

	URL: version.ngon.cc/
	Method: POST
	Body:
	{
		user_id: 12345,
		version: 1.2,
		data: {
			achievements: "{
				'Updated to Version 1.2.0': true,
				'A new Achievemnt': false
			}",
			statistics: "{
				'Monsters Killed': 143,
				'Deaths': 18,
				'Hours Played': 122,
				'Average Playtime': 1,
				'Distance Traveled': 127020593,
				'Derps': 2
			}"
		}
	}

	Response:
	version_id // a hexadecimal number

#### READ

get all user data

	URL: version.ngon.cc/:user_id
	Method: GET
	Response:
		{
			user_id: 12345,
			1.01: {
				'items': {
					'Sword Of Holding': {
						'dammage': 12,
						'durability': 100,
						'weight': 10
					},
					'Leather Belt': {
						'strength': 4,
						'stamina': 4
					}
				},
				'achievements': {
					'Killed the Ogre': true,
					'Pillaged the Town': false,
					'Saved the Day': false,
					'Far Too Stronk': true
				}
			}
			1.2: {
				'achievements': {
					'Updated to Version 1.2.0': true,
					'A new Achievemnt': false
				},
				'statistics': {
					'Monsters Killed': 143,
					'Deaths': 18,
					'Hours Played': 122,
					'Average Playtime': 1,
					'Distance Traveled': 127020593,
					'Derps': 2
				}
			}
			1.25: {
				'achievements': {
					'Updated to Version 1.2.0': true,
					'A new Achievemnt': false
				},
				'statistics': {
					'Monsters Killed': 143,
					'Deaths': 18,
					'Hours Played': 122,
					'Average Playtime': 1,
					'Distance Traveled': 127020593,
					'Derps': 2
				}
			}
		}

specific user data

	URL: version.ngon.cc/:user_id/:data
	Method: GET
	Response:
				{
					user_id: 12345,
					1.01: {
						'achievements': {
							'Killed the Ogre': true,
							'Pillaged the Town': false,
							'Saved the Day': false,
							'Far Too Stronk': true
						}
					}
					1.2: {
						'achievements': {
							'Updated to Version 1.2.0': true,
							'A new Achievemnt': false
						}
					}
				}

#### UPDATE

URL: version.ngon.cc/:user_id/:data
Method: PUT
POST data:
	{
		_method: 'PUT',
		version: 1.2.5,
		data: 'SOME DATA'
	}