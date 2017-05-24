require('colors');

const application = require('./application');
const runningPort = process.env.KNOODLE_PORT || 3333;
const mongoose = require('mongoose');
const mongoDSN = process.env.MONGO_DSN || 'mongodb://localhost/knoodle';
const debug = require('debug')('knoodle');

mongoose.Promise = global.Promise;

// establish mongo connection
mongoose.connection.once('open', () => {
    debug('Connection with mongo db is open');
});

mongoose.connection.on('error', (error) => {
    debug(error);

    console.error(error);

    process.exit(1);
});

mongoose.connect(mongoDSN);

application.listen(runningPort, () => {
    console.log(`Knoodle is running on http://localhost:${runningPort} :-)`.green.bold);
    console.log(`Please visit http://localhost:${runningPort}/swagger.json for a complete API documentation`.grey.bold);
});
