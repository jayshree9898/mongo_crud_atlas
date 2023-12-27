const mongoose = require('mongoose');

const userSessionSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    token: {
        type: String,
        required: true
    }, created_At: {
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
    timestamp: { created_At: "created_at", updated_At: 'updated_at', deleted_At: 'deleted_at' }
});

const userSession = mongoose.model('userSessions', userSessionSchema);
module.exports = userSession