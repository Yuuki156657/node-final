const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    }
});

//validation for email
// messageSchema.path('email').validate((val) => {
//     return emailRegex.text(val);
// }, 'Invalid e-mail.');

mongoose.model('Message', messageSchema);