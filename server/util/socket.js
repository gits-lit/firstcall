const { Server } = require('socket.io');
const call = require('./connections/call');
const chat = require('./connections/chat');

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*' // enable CORS for sockets
        }
    });

    io.on('connection', client => {
        call(io, client); // set up the back end call
        chat(io, client); // set up the chat system
    });
};