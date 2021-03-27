const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// to avoid a CORS issue
app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
    next();
});

// just some default page
app.get('/', (req, res) => res.send(`ya yeet, firstcall's backend server!`));
app.use('/', require('./routes/call')); // set up twilio's call stuff
app.use('/api', require('./routes/general')); // api
app.use('/api/users', require('./routes/users')); // api

const SERVER_PORT = (process.env.PORT || 3000);
const server = app.listen(SERVER_PORT, () => console.log(`Server started on port ${SERVER_PORT}.`));

// set up our socket server connection
require('./util/socket')(server);