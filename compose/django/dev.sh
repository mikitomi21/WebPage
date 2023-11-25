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
elif [ "$1" = "createdefaultdata" ]; then
    python backend/manage.py createdefaultdata
elif [ "$1" = "cleardatabase" ]; then
    python backend/manage.py cleardatabase
elif [ "$1" = "flake8" ]; then
    python -m flake8 --config=backend/setup.cfg
elif [ "$1" = "test" ]; then
    if [ -n "$2" ]; then
        python backend/manage.py test "$2"
    else
        python backend/manage.py test backend
    fi
elif [ "$1" = "shell" ]; then
    python backend/manage.py shell
else
  python backend/manage.py wait_for_db
  python backend/manage.py runserver 0.0.0.0:8000
fi