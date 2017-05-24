const express = require('express');
const application = express();
const Survey = require('./models/survey');
const createSurveyFilters = require('./filters/surveys');
const debugError = require('debug')('knoodle::error');
const getSurveys = require('./routes/get-surveys');
const createSurvey = require('./routes/create-survey');
const patchSurvey = require('./routes/patch-survey');
const answerSurvey = require('./routes/answer-survey');
const getAnswers = require('./routes/get-answers');
const swagger = require('./routes/swagger');
const parser = require('body-parser');

application.use(parser.json());

// Retrieve the API documentation:
application.get('/swagger.json', swagger);

// Retrieve/Create survey(s)
application.get('/surveys', getSurveys);
application.post('/surveys', createSurvey);
application.patch('/surveys/:id', patchSurvey);

// Retrieve/Create survey answers
application.get('/surveys/:id/answers', getAnswers);
application.post('/surveys/:id/answers', answerSurvey);

module.exports = application;
