const Survey = require('./../models/survey');

module.exports = function getOneSurvey(request, response, next) {
    Survey
        .findById(request.params.id)
        .exec()
        .then(survey => response.json(survey))
        .catch(e => response.status(404).json())
    ;
}
