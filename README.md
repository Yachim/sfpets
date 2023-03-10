# Shakes and Fidget pets tracker
Tracks user's pets and shows the pets that can be caught today.

# Preview the project
If you have installed docker, you can easily preview the project:
 1. set your environment manually or use the `.env.default` file (rename to `.env`)
 2. run `docker compose up` in the root directory

## .env file
The env file should contain following fields:
 - `DB_USER` - username for database user
 - `DB_PASS` - password for database user
 - `DB_NAME` - database name
 - `SECRET_KEY` - [secret key](https://docs.djangoproject.com/en/4.1/ref/settings/#std-setting-SECRET_KEY) for signining
 - `DEBUG` - 0/1
 - `ALLOWED_HOSTS` - list of IPs/URLs separated by spaces
 - `BIND_ADDRESS` - address to bind the wsgi server on
 - `VITE_API_HOST`- tells the frontend the address the api is on
 - `VITE_WITH_SERVER` - tells the frontend if it's with server or only client with localstorage

 If running without server, you only need to specify `VITE_WITH_SERVER`.

## Contributing
### Requirements
 - Python 3.10
 - [Poetry](https://python-poetry.org/docs/#installation) - the python package manager
   - this project uses version 1.2.2
   - `pip install "poetry==1.2.2"`
 - Node and npm

### Set your environment
Refer to [the previous chapter](#env-file), here is an example:
```
DB_USR=test_usr
DB_PASS=test_pass
DB_NAME=test_db

SECRET_KEY=secret
DEBUG=1

ALLOWED_HOSTS=localhost 127.0.0.1 example.com
BIND_ADDRESS=0.0.0.0

VITE_API_HOST=http://localhost:8000/api/
VITE_WITH_SERVER=1
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

### Frontend development server
 1. start backend by running `docker compose up wsgi` in root directory
 2. cd into the client directory
 3. Install dependencies by running `npm install`
 4. Start the development server by running `npm run dev`
