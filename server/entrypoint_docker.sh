#!/bin/bash

cd pets_api

poetry run python manage.py migrate --fake sessions zero
poetry run python manage.py migrate --fake-initial

poetry run gunicorn -b 0.0.0.0:8000 pets_api.wsgi
