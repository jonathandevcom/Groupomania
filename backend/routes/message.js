const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message')
const auth = require('../middleware/auth');

router.route('/')
    .get(auth, messageCtrl.postAllMessages)
    .post(auth, messageCtrl.createOneMessage)

router.route('/:id')
    .get(auth, messageCtrl.postOneMessage)
    .delete(auth, messageCtrl.deleteOneMessage)
    .put(auth, messageCtrl.editOneMessage)

module.exports = router;