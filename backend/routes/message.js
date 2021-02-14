const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.route('/')
    .get(messageCtrl.postAllMessages)
    .post(multer, messageCtrl.createOneMessage)
 
router.route('/:id')
    .get(auth, messageCtrl.postOneMessage)
    .delete(auth, messageCtrl.deleteOneMessage)
    .put(auth, messageCtrl.editOneMessage)

module.exports = router;