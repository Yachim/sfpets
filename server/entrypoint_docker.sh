#!/bin/bash

cd pets_api

poetry run python manage.py makemigrations
poetry run python manage.py migrate

poetry run gunicorn -b $BIND_ADDRESS:8000 pets_api.wsgi
