const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    name: {
        type: String
    },
    message: {
        type: String
    }
});

mongoose.model('Message', messageSchema);