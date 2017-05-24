const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: String,
    name: String,
    authorizationKey: String,
});

module.exports = User;
