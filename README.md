# Shakes and Fidget pets tracker
Tracks user's pets and shows the pets that can be caught today.
## .env file
The env file should contain following fields:
 - `DB_USER` - username for database user
 - `DB_PASS` - password for database user
 - `DB_NAME` - database name
 - `SECRET_KEY` - [secret key](https://docs.djangoproject.com/en/4.1/ref/settings/#std-setting-SECRET_KEY) for signining
 - `DEBUG` - 0/1
 - `ALLOWED_HOSTS` - list of IPs separated by spaces
 - `API_HOST`- tells the frontend the address the api is on

## Contributing
### Requirements
 - Python 3.10
 - [Poetry](https://python-poetry.org/docs/#installation) - the python package manager
   - this project uses version 1.2.2
   - `pip install "poetry==1.2.2"`

### Set your environment
Refer to [the previous chapter](#env-file), here is an example:
```
DB_USR=test_usr
DB_PASS=test_pass
DB_NAME=test_db
SECRET_KEY=secret
DEBUG=1
ALLOWED_HOSTS=localhost
API_HOST=localhost
```

### Backend development server
Django server for production is started with unicorn inside the Dockerfile.
The server with Django with the manage.py file and supports many features
such as auto reload.

#### Dependencies
This project uses the [Poetry](https://python-poetry.org/docs/#installation)
package manager for python. Install dependencies by running `poetry install`
inside the server directory.

#### Database
The database must be started manually. Run `docker compose up db`.

#### Run the development server
Run `poetry run python manage.py runserver` inside the server directory.

### Frontend
TODO
