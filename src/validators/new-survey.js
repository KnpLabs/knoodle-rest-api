const joi = require('joi');

const schema = joi.object().keys({
    name: joi.string().min(4).required(),
    description: joi.string().required(),
    author: joi.object().keys({
        email: joi.string().email().required(),
        name: joi.string().min(1).required(),
    }).default({
        email: 'hello@knplabs.com',
        name: 'KNP Labs',
    }),
    questions: joi.array().min(1).items(joi.object().keys({
        title: joi.string().min(1).required(),
        answers: joi.array().min(2).items(joi.string().min(1).required()).required(),
    })),
});

module.exports = function validateNewSurvey(survey) {
    return schema.validate(survey);
};
