#!/bin/bash

set -e

if [ "$1" = "createsuperuser" ]; then
    python backend/manage.py createsuperuser
elif [ "$1" = "makemigrations" ]; then
    python backend/manage.py makemigrations
elif [ "$1" = "migrate" ]; then
    python backend/manage.py migrate
elif [ "$1" = "createsuperuseradmin" ]; then
    python backend/manage.py createsuperuseradmin
else
  python backend/manage.py wait_for_db
  python backend/manage.py migrate
  python backend/manage.py runserver 0.0.0.0:8000
fi