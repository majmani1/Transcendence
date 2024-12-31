#!/bin/bash

cd AuthProject

python3.11 manage.py createsuperuser --username=hr --password=hrr

python3.11 manage.py makemigrations
python3.11 manage.py migrate

# python3.11 manage.py collectstatic
python3.11 manage.py runserver 0.0.0.0:9080
# exec python manage.py runserver 0.0.0.0:8000
