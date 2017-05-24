const Survey = require('./../models/survey');
const Answer = require('./../models/answer');
const createFilter = require('./../filters/answers-filters');

module.exports = function getAnswers(request, response, next) {
    Survey
        .findById(request.params.id)
        .exec()
        .then(survey => {
            let filters = createFilter(request.query);
            filters.survey = survey.id;

            Answer
                .find(filters)
                .limit(parseInt(request.query.limit) || 25)
                .skip((parseInt(request.query.page) - 1) * parseInt(request.query.limit))
                .exec()
                .then(answers => {
                    if (!answers || !answers.length) {
                        response.status(204);
                    }

                    response.json(answers);

                    next();
                })
                .catch(e => {
                    next(e)
                })
            ;
        })
        .catch(e => next(e))
    ;
};
