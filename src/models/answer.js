const mongoose = require('mongoose');

const Answser = mongoose.model('Answer', {
    survey: mongoose.Schema.Types.ObjectId,
    user: {
        email: String,
        name: String,
    },
    answers: [{
        question: Number,
        choice: Number,
    }]
});

module.exports = Answser;
