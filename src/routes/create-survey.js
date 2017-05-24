const createSurveyInput = require('./../inputs/survey');
const validate = require('./../validators/new-survey');
const debug = require('debug')('knoodle::error');
const Survey = require('./../models/survey');

module.exports = function createSurvey(request, response, next) {
    const data = validate(request.body);

    if (data.error) {
        response
            .set('Content-Type', 'application/problem+json')
            .status(400)
            .json(data.error)
        ;

        return;
    }

    const survey = new Survey(data.value);

    survey.save().then(survey => {
        response.status(201).json(survey);
    }).catch(e => {
        debug(e);

        response.status(500).json({status: 'errored, please contact KNPLabs :/'});
    })
};
