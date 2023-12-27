require('dotenv').config();

module.exports = {
    protocol: process.env.PROTOCOL,

    database: {
        db_url: process.env.DB_URL,
        port: process.env.PORT,
        dialect: process.env.DIALECT,
        host: process.env.HOST
    },

    sslCertificates: {
        privkey: process.env.PRIVKEY,
        fullchain: process.env.FULLCHAIN
    }
}