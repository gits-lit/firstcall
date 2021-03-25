const system = require('./system');
require('dotenv').config(); // load env

const speech = require('@google-cloud/speech');
const { Server } = require('socket.io');
const speechClient = new speech.SpeechClient();
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID,
                                 process.env.TWILIO_AUTH_TOKEN);

const request = {
    config: {
        encoding: 'MULAW',
        sampleRateHertz: 8000,
        languageCode: 'en-US'
    },
    interimResults: true
};

var responders = {};
var users = {};
module.exports = async (io, client) => {
    let id = client.id;
    let isResponder = undefined;
    let recognizeStream = undefined;

    // create an initial user entry in our database
    let uid = undefined;

    client.on('connected', data => {
        if (data.user_type === 'user') {
            users[id] = {
                uid,
                client,
                transcript: '',
                start: new Date()
            };

            isResponder = false;

            // create stream to the google speech to text API
            recognizeStream = speechClient
                .streamingRecognize(request)
                .on('error', console.error)
                .on('data', data => {
                    let transcript = data.results[0].alternatives[0].transcript;
                    users[id].transcript = transcript;
                    // console.log(transcript);

                    // send to all ARVs
                    io.to('responders').emit('update', {
                        uid,
                        transcript
                    });
                });

            // let responders know there is a new user
            client.joinedChat = false;
            io.to('responders').emit('new', { uid });
        } else if (data.user_type === 'responder') {
            responders[id] = client;
            isResponder = true;

            client.username = data.username;
            client.joinedChat = true;

            client.join('responders');
            for (let [id, info] of Object.entries(users))
                client.join(info.uid);
        } else {
            console.log(`Client "${id}" tried to connect with an invalid user type of "${data.user_type}".`);
            client.disconnect();
            return;
        }

        console.log(`Client "${id}" has successfully connected with user type "${data.user_type}".`);
    });

    client.on('start', data => {
        console.log(`Starting media stream "${data.streamSid}.`);
        users[id].fromNumber = data.start.customParameters.number;
    });

    client.on('media', data => {
        // write media packets to the recognize stream
        recognizeStream.write(data.media.payload);
    });

    client.on('stop', async () => {
        // call has ended
        if (recognizeStream !== undefined) {
            recognizeStream.destroy();
            recognizeStream = undefined;

            users[id].end = new Date();
            let diff = Math.abs(users[id].end.getTime() - users[id].start.getTime());
            let seconds = (diff / 1000);

            await system.updateUserEntry(uid, {
                transcript: users[id].transcript,
                phoneNumber: users[id].fromNumber,
                time: seconds,
                startDate: users[id].start.toLocaleString('en-US'),
                endDate: users[id].end.toLocaleString('en-US'),
                status: '0',
                name: null,
                address: null,
                lat: null,
                long: null
            });

            // now send the text message!
            let message = await twilio.messages.create({
                body: `FirstCall: Provide 911 status updates at https://app_name.com/user/u?${uid}.`,
                from: process.env.TWILIO_NUMBER,
                to: users[id].fromNumber
            });

            if (message.errorMessage !== null)
                console.log(`Error in sending a text message: ${message.errorMessage}`);
        }
    });

    client.on('disconnecting', () => {
        if (userType === undefined) return;

        // clear from our cache
        if (isResponder) delete responders[id];
        else {
            delete users[id];

            // let responders know this user is gone :(
            io.to('responders').emit('left', { uid });
        }
    });

    // console.log(`Client [${id}] has connected.`);
};