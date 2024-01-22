## Developer Guide

This guide contains helpful information for anyone wanting
to contribute to this project.

## Background Technologies

The project relies on four primary technologies:

- Django (Python)
- React (TypeScript)
- PostgreSQL
- Tailwind CSS

You should be familiar with these to some level before diving
into the project.

## Setup (Backend)

1. Clone the repository
2. Install [Python 3](https://python.org) if you have not already done so
3. Install [Docker](https://docker.com) if you have not already done so
4. Open the repository root in your favorite editor
5. Install packages with `pip3 install -r requirements.txt`
6. Start backend services with `docker-compose -f docker-compose.yml -f docker-compose-local.yml up -d`
7. Execute migrations with `python3 manage.py migrate`
8. Load sample data with `python3 manage.py loadsampledata`
9. Run the backend `python3 manage.py runserver`

The backend API server should now be running on port 8000.
You can view the docs page at 
[http://localhost:8000/api/docs](http://localhost:8000/api/docs)

The backend API makes heavy use of the Django Ninja Framework.
Looking over the [docs](https://django-ninja.dev/) is recommended.

## Setup (Frontend)

1. Clone the repository
2. Install [Node 18+](https://nodejs.org) if you have not already done so
3. Open the frontend folder in your favorite editor
4. Install packages with `npm install`
5. Run the frontend with `npm run start`

The frontend should now start on [http://localhost:3000](http://localhost:3000)

## Notes

To make local development easier, a nginx container that emulates the production
runtime is loaded by the docker command in the backend notes.  This setup
allows you to access both frontend and backend via [http://localhost](http://localhost)
over port 80.
