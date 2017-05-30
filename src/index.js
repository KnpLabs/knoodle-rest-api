require('colors');

const application = require('./application');
const runningPort = process.env.API_PORT || 3333;
const mongoose = require('mongoose');
const mongoDSN = process.env.MONGO_DSN || 'mongodb://localhost/knoodle';
const debug = require('debug')('knoodle');
const http = require('http');
const WebSocket = require('ws');
const connectWebSocket = require('./socket/server');

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

const server = http.createServer(application);

connectWebSocket(server);

server.listen(runningPort, () => {
    console.log(`Knoodle is running on http://localhost:${runningPort} :-)`.green.bold);
    console.log(`Please visit http://localhost:${runningPort}/swagger.json for a complete API documentation`.grey.bold);
});
