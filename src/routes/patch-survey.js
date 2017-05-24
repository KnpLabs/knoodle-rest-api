const Survey = require('./../models/survey');
const validate = require('./../validators/patch-survey');
const patch = require('mixin-deep');

module.exports = function patchSurvey(request, response, next) {
    let survey = Survey
        .findById(request.params.id)
        .exec()
        .then(survey => {
            if (!survey) {
                response.status(404).json({});

                return;
            }

            let data = validate(request.body);

            if (data.error) {
                response
                    .set('Content-Type', 'application/problem+json')
                    .status(400)
                    .json(data.error)
                ;

                return;
            }

            survey = patch(survey, data.value);

            return survey.save().then(e => {
                response.status(200).json(survey);
            });
        })
        .catch(e => {
            response.status(400).set('Content-Type', 'application/problem+json').json(e);
        })
    ;
}
