require('colors');
const Socket = require('ws').Server;
const Survey = require('./../models/survey');
const Answer = require('./../models/answer');

function connection(socket, request) {
    socket.on('message', id => {
        if (!id) {
            return;
        }

        Answer
            .findById(id)
            .exec()
            .then(answer => {
                console.log(`[SOCKET] Sending answer#${answer._id} to connected clients`.grey);
                socket.send(JSON.stringify(answer));
            })
            .catch(console.error)
        ;
    });
}

module.exports = function connect(httpServer) {
    let server = new Socket({ server: httpServer });

    server.on('connection', connection);

    return server;
}
