const mongoose = require('mongoose');
const config = require('./config');

const dbConnect = async () => {
    try {
        await mongoose.connect(config.database.db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("database connect successfully...");
    } catch (error) {
        console.log(error);
    }
}


module.exports = {dbConnect};