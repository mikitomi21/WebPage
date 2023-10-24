#!/bin/sh

set -e

if [ "$1" = "createsuperuser" ]; then
    python backend/manage.py createsuperuser
else
  python backend/manage.py wait_for_db
  python backend/manage.py migrate
  python backend/manage.py runserver 0.0.0.0:8000
fi