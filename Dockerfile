FROM node:18-alpine as builder

COPY frontend/ /app

WORKDIR /app

RUN npm clean install
RUN npm run build

FROM python:3-alpine as runner

RUN apk add nginx

COPY formbox/ /app
COPY mysite/ /app
COPY manage.py /app
COPY requirements.txt /app

WORKDIR /app

RUN pip3 install -r requirements.txt

CMD python3 manage.py migrate && python3 manage.py loadsampledata && python3 manage.py runserver 0.0.0.0:8000
