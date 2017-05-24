const Survey = require('./../models/survey');
const Answer = require('./../models/answer');
const createFilter = require('./../filters/answers-filters');

module.exports = function getAnswers(request, response, next) {
    Survey
        .findById(request.params.id)
        .exec()
        .then(survey => {
            let filters = createFilter(request.query);

            Answer
                .find({survey: survey.id})
                .filter(filters)
                .limit(filters.limit)
                .skip(filters.skip)
                .exec()
                .then(answers => {
                    if (!answers || !answers.length) {
                        reponse.status(204);
                    }

                    response.json(answers);
                })
                .catch(e => {
                    response.status(500).json(e);
                })
            ;
        })
        .catch(e => response.status(404).json())
    ;
};
