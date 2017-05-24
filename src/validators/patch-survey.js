const joi = require('joi');
const schema = joi.object().keys({
    name: joi.string().min(1),
    author: joi.object().keys({
        email: joi.string().email(),
        name: joi.string().min(1),
    }),
    questions: joi.array().items(joi.object().keys({
        title: joi.string().min(1),
        answers: joi.array().items(joi.string())
    }))
});

module.exports = function validate(data) {
    return schema.validate(data);
}
