const mongoose = require('mongoose');

// 変更0916
require('dotenv').config()

mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.ATLAS_URI : 'mongodb://localhost:27017/MessageDB', { 
// -----------------------

    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});


require('./message.model');