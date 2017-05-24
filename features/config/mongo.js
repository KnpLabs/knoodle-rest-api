const mongoDSN = process.env.MONGO_DSN || 'mongodb://localhost/knoodleTest';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(mongoDSN);
