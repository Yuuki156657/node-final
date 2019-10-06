const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    message: {
        type: String
    }
});

mongoose.model('Message', messageSchema);