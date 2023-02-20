#!/bin/bash

cd pets_api

poetry run python manage.py makemigrations --no-input
poetry run python manage.py migrate --no-input

poetry run gunicorn -b $BIND_ADDRESS:8000 pets_api.wsgi
