const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Message = mongoose.model('Message');

// -----------
const app = express();
const cors = require('cors');

app.use(cors());
//-------------

router.get('/', (req, res) => {
    res.render("message/addOrEdit",{
        viewTitle : "New Message"
    });    
});

router.post('/', (req, res) => {
        insertRecord(req, res);
});

mongoose.set('useFindAndModify', false);


function insertRecord(req, res) {
    var message = new Message();
    message.fullName = req.body.fullName;
    message.message = req.body.message;
    message.save((err, doc) => {
        if (!err)
            res.redirect('message/list');
        else {
                console.log('Error during record insection : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Message.find((err, docs) => {
        if (!err){
            res.render("message/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving message list :' + err);
        }
    })
});

router.get('/:id', (req, res) => {
    Message.findById(req.params.id, (err, doc) => {
        if (!err){
            res.render("message/addOrEdit", {
                viewTitle: "Update Message",
                message: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Message.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/message/list');
        }
        else { console.log('Error in message delete :' + err); }
    });
});

module.exports = router;