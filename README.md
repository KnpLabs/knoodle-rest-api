Knoodle Rest Api
================

Knoodle is a survey storage application. Used by KNP Labs for trainings ;)

## Requirements

In order to make this works you should ensure that you have on your system:

- NodeJS and NPM (`>= 5.0`)
- MongoDB

## Installation

1. Clone this project: `git clone git@github.com:KnpLabs/knoodle-rest-api.git && cd knoodle-rest-api`
2. Install the dependencoes: `npm install`
3. You can optionaly load fixtures: `npm run fixtures`
3. Start the server: `npm start`
4. Enjoy your API on `http://localhost:3333`

## API Documentation

You can access to the swagger documentation on `GET http://localhost:3333/swagger.json` (copy past this json file
inside a swagger editor).

## Configuration

- You can change the API Running Port: `API_PORT=5050 npm start`
- You can specialized the mongo connection (`mongodb://localhost/knoodle` by default): `MONGO_DSN=mongodb://localhost/mydb`

## Run the tests

1. Run a test server: `API_PORT=8888 MONGO_DSN=mongodb://localhost/knoodle-test npm start`
2. Run your test on the api: `API_BASE_URL=http://localhost:8888 MONGO_DSN=mongodb://localhost/knoodle-test npm test`
