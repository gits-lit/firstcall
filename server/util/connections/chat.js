const system = require('../../util/system');
const socket = require('../socket');
// const botName = 'Bot'; // idk

const moment = require('moment');
const formatMessage = (text) => {
    return {
        text,
        time: moment().format('h:mm a')
    };
};

module.exports = async (io, client) => {
    // only the user should call this, not responders
    client.on('joinRoom', uid => {
        client.uid = uid;
        client.joinedChat = true;
        client.join(uid);

        // let's welcome the user (feel free to change the welcome message)
        // client.emit('message', formatMessage(botName, `Welcome to FirstCall.`));

        // broadcast to other users
        // client.broadcast.to(uid).emit('message', formatMessage(botName, `${username} has connected.`));
    });

    client.on('chatMessage', data => {
        if (data.user_type === 'responder')
            io.to(data.uid).emit('message', formatMessage(data.message));
        else if (data.user_type === 'user')
            io.to('responders').emit('message', formatMessage(data.message));
    });

    client.on('imageSend', data => {
        if (data.user_type === 'responder')
            io.to(data.uid).emit('image', formatMessage(data.image));
        else
            io.to('responders').emit('message', formatMessage(data.image));
    });

    /*client.on('disconnecting', data => {
        if (!client.joinedChat) return;

        // let the rooms know
        client.rooms.forEach(uid => {
            if (uid === 'responder') return;
            io.to(uid).emit('message', formatMessage(client.username, `${client.username} has disconnected.`));
        });
    });*/
};