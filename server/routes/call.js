const router = require('express')();
const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;

// this route 
router.post('/', (req, res) => {
    const msg = new VoiceResponse();

    msg.start().stream({
        url: `wss://${req.headers.host}`
    }).parameter({
        name: 'number',
        value: req.body.From
    });
    
    msg.say({
        voice: 'man',
        language: 'en-US'
    }, `911, what is your emergency?`);

    msg.pause({ length: 60 });

    res.set('Content-Type', 'text/xml');
    res.send(msg.toString());
});

module.exports = router;