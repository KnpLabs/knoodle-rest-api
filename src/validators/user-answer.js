const joi = require('joi');
const schema = joi.object().keys({
    user: joi.object().keys({
        email: joi.string().email().required(),
        name: joi.string().required(),
    }).default({
        email: 'anonymous@knoodle.com',
        name: 'anonymous'
    }),
    answers: joi.array().min(1).items(joi.object().keys({
        question: joi.number().integer().required(),
        choice: joi.number().integer().required(),
    })).required(),
});

module.exports = function validate(data) {
    return schema.validate(data);
};
