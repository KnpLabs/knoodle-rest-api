const mongoose = require('mongoose');

const Survey = mongoose.model('Survey', {
    name: String,
    description: String,
    author: {
        email: String,
        name: String,
    },
    questions: [{
        title: String,
        answers: [String],
    }]
});

module.exports = Survey;
