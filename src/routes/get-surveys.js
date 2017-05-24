const createSurveyFilters = require('./../filters/surveys');
const Survey = require('./../models/survey');
const debug = require('debug')('knoodle::error');

module.exports = function getSurveys(request, response, next) {
    const filters = createSurveyFilters(request);
    let page = parseInt(request.query.page) || 1;
    let limit = parseInt(request.query.limit) || 25;

    Survey
        .find(filters)
        .limit(limit)
        .skip((page - 1) * limit)
        .exec()
        .then((surveys) => {
            if (!surveys || !surveys.length) {
                response.status(204).json({});

                return;
            }

            response.json(surveys);
        })
        .catch(e => {
            debug(e);

            response.status(500).json({status: 'errored'});
        })
    ;
};
