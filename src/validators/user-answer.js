const joi = require('joi');
const schema = joi.object().keys({
    survey: joi.string().required(),
    user: joi.object().keys({
        email: joi.string().email().required(),
        name: joi.string().required(),
    }).default({
        email: 'anonymous@knoodle.com',
        name: 'anonymous'
    }),
    answers: joi.array().min(1).items(joi.object().keys({
        question: joi.number().required(),
        choice: joi.number().required(),
    })).required(),
});

module.exports = function validate(data) {
    return schema.validate(data);
};
