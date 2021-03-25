const fs = require('fs');
require('dotenv').config();

const file = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const data = process.env.GOOGLE_CREDENTIALS;

if (file && file.length > 0)
    fs.writeFile(file, data, (err) => {});