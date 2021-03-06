# API documentation
## Hostname
## API
### Official
* Authentication
	* POST/webresources/users/login
	* POST/webresources/users/register
* User
	* GET/webresources/users/me
	* GET/webresources/users
	* GET/webresources/users/{id}
	* PUT/webresources/users
	* DELETE/webresources/users
* Post
* Comment
* Category
* Rate

##Errors handling
Http status code should be checked for at least following error conditions:
* 400 Bad Request 
* 401 Unauthorized
* 403 Forbidden 
* 404 Not Found 
* 405 Method Not Allowed
* 406 Not Acceptable
* 415 Unsupported Media Type
* 500 Internal Server Error
* 503 Service Unavailable

## Authentication
#### POST/webresources/users/login
User log in to server system
Request body payload:
| key |	type | description |
| --- | --- | --- |
| username | string |  |
| password | string |  |

Response payload:
| key |	type | description |
| --- | --- | --- |
| token | string | Server Token |

Sample request:
```json
{
	"username": "HuyTrinh",
	"password": "123456"
}
```
Sample response:
```json
{
	"token":"HERE IS THE TOKEN"
}
```
#### POST/webresources/users/register
User sign up to server system
Request body payload:
| key |	type | description |
| --- | --- | --- |
| email | string |  |
| username | string |  |
| password | string |  |

Response payload:
| key |	type | description |
| --- | --- | --- |
| token | string | Server Token |

Sample request:
```json
{
	"email": "huy@gmail.com",
	"username": "HuyTrinh",
	"password": "123456"
}
```
Sample response:
```json
{
	"token":"HERE IS THE TOKEN"
}
```

## User
#### GET/webresources/users
User get its own information
Header payload:
| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Query params:
| key |	type | description |
| --- | --- | --- |
| EMPTY |  |   |

Response payload:
| key |	type | description |
| --- | --- | --- |
| email | string ||
| pass | string |Empty |
| uid | string | |
| username | string |  |

Sample header:
```json
{
	"authorization":"HERE IS THE TOKEN"
}
```

Sample response:
```json
{
    "email": "huy@gmailcom",
    "pass": "",
    "uid": 1,
    "username": "HuyTrinh"
}
```

#### GET/webresources/users
User get a list of users

Header payload:
| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Query params:
| key |	type | description |
| --- | --- | --- |
| EMPTY |  |   |

Response payload:
| key |	type | description |
| --- | --- | --- |
| email | string ||
| pass | string |Empty |
| uid | string | |
| username | string |  |

Sample header:
```json
{
	"authorization":"HERE IS THE TOKEN"
}
```

Sample response:
```json
[
    {
        "email": "huy@gmailcom",
        "pass": "",
        "uid": 1,
        "username": "HuyTrinh"
    },
    {
        "email": "tuan@gmailcom",
        "pass": "",
        "uid": 2,
        "username": "TuanLe"
    }
]
```

####  GET/webresources/users/{id}
User get information about an user based on id

Header payload:
| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Request body payload:
| key |	type | description |
| --- | --- | --- |
| EMPTY |  |   |

Response payload:
| key |	type | description |
| --- | --- | --- |
| email | string ||
| pass | string |Empty |
| uid | string | |
| username | string |  |

Sample header:
```json
{
	"authorization":"HERE IS THE TOKEN"
}
```

Sample response:
```json
{
    "email": "huy@gmailcom",
    "pass": "",
    "uid": 1,
    "username": "HuyTrinh"
}
```

####  PUT/webresources/users
User update its information

Header payload:
| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Query params:
| key |	type | description |
| --- | --- | --- |
| username |string  |   |
| email |string  |   |
| oldpassword |string  |   |
| newpassword |string  |   |

Response payload:
| key |	type | description |
| --- | --- | --- |
| email | string ||
| pass | string |Empty |
| uid | string | |
| username | string |  |

Sample header:
```json
{
	"authorization":"HERE IS THE TOKEN"
}
```

Sample request:
```json
{
	"email": "huy@gmail.com",
	"username": "HuyTrinh",
	"oldpassword": "123456",
	"newpassword": "12345689"
}
```
Sample response:
```json
{
    "email": "huy@gmailcom",
    "pass": "",
    "uid": 1,
    "username": "HuyTrinh"
}
```
####  DELETE/webresources/users
User delete account

Header payload:
| key |	type | description |
| --- | --- | --- |
| authorization | string | Server Token  |

Query params:
| key |	type | description |
| --- | --- | --- |
| EMPTY |  |   |

Response payload:
| key |	type | description |
| --- | --- | --- |
| email | string ||
| pass | string |Empty |
| uid | string | |
| username | string |  |

Sample header:
```json
{
	"authorization":"HERE IS THE TOKEN"
}
```
Sample response:
```json
{
    "email": "huy@gmailcom",
    "pass": "",
    "uid": 1,
    "username": "HuyTrinh"
}
```

## Post
## Comment
## Category
## Rate