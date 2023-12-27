const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const config = require('./config/config');
const db = require('./config/db.config');

db.dbConnect();

app.use(express.json());


let server;

if (config.protocol == "https") {
    const https = require('https');
    const option = {
        key: fs.readFileSync(config.sslCertificates.PRIVKEY),
        cert: fs.readFileSync(config.sslCertificates.FULLCHAIN)
    }
    server = https.createServer(option, app);
} else {
    const http = require('http');
    server = http.createServer(app);
}


server.listen(config.database.port, () => {
    console.log(`server running on port ${config.database.port}`);
})
