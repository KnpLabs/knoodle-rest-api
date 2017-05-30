const Socket = require('ws');

module.exports = function sendAnswer(answer) {
    let wss = new Socket(`ws://localhost:${process.env.API_PORT || 3333}`);

    wss.on('open', () => {
        wss.send(`${answer._id}`);
    });
}
