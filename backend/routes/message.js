const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-gif');

router.route('/')
// ajouter l'auth
    .get(messageCtrl.getAllMessages)
    .post(multer, messageCtrl.createOneMessage)
 
router.route('/:id')
    .delete(messageCtrl.deleteOneMessage)

module.exports = router;