#!/bin/sh

cd backend
python3 manage.py migrate
python3 manage.py loadsampledata
python3 manage.py runserver &
cd ..
nginx -g "daemon off;"