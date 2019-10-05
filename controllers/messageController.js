const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Message = mongoose.model('Message');

// 変更0916
const app = express();
// const cors = require('cors');

// app.use(cors());
//-------------

// app.get('/test', (req, res) => {
//     res.send('hi')
// });

router.get('/', (req, res) => {
    res.render("message/addOrEdit",{
        viewTitle : "Edit Message"
    });    
});

router.post('/', (req, res) => {
    // if (req.body._id == '')
        insertRecord(req, res);
    //     else
        // updateRecord(req, res);
});

mongoose.set('useFindAndModify', false);


function insertRecord(req, res) {
    var message = new Message();
    message.fullName = req.body.fullName;
    message.email = req.body.email;
    message.address = req.body.address;
    message.phone = req.body.phone;
    message.save((err, doc) => {
        if (!err)
            res.redirect('message/list');
        else {
            // if (err.name == 'ValidationError'){
            //     handleValidationError(err, req.body);
            //     res.render("employee/addOrEdit",{
            //         viewTitle : "Insert Employee",
            //         employee: req.body
            //     });
            // }
            // else
                console.log('Error during record insection : ' + err);
        }
    });
}

function updateRecord(req, res) {
    // Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
    Message.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err) => {
    
    if (!err) { res.redirect('message/list'); }
        else {
            console.log('Error during record update : ' + err);
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

// function handleValidationError(err, body) {
//     for (field in err.errors) {
//         switch (err.errors[field].path) {
//             case 'fullName':
//                 body['fullNameError'] = err.errors[field].message;
//                 break;
//             case 'email':
//                 body['emailError'] = err.errors[field].message;
//                 break;
//             default:
//                 break;
//         }
//     }
// }

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