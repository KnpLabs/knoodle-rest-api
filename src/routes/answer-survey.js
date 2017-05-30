const Survey = require('./../models/survey');
const Answer = require('./../models/answer');
const validate = require('./../validators/user-answer');
const notifyAnswer = require('./../socket/send-answer');

module.exports = function answerSurvey(request, response, next) {
    Survey
        .findById(request.params.id)
        .exec()
        .then(survey => {
            if (!survey) {
                response.status(404).json();

                return;
            }

            let data = validate(request.body);
            data.value.survey = request.params.id;

            if (data.error) {
                response.status(400).json(data.error);

                return;
            }

            let answer = new Answer(data.value);

            answer.save().then(a => {
                notifyAnswer(a);
            });

            response.status(200).json(answer);
        })
        .catch(e => next(e))
    ;
}

