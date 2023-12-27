const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true,
        set: value => bcrypt.hashSync(value, 10)
    },
    profile_image: {
        type: String,
        required: false
    },
    created_At: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated_At: {
        type: Date,
        default: Date.now,
        required: true
    },
    deleted_At: {
        type: Date,
        required: false
    }
}, {
    timestamp: { created_At: 'created_at', updated_At: 'updated_at', deleted_At: 'deleted_at' }
});

const user = mongoose.model('users',userSchema);
module.exports = user