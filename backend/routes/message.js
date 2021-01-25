const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message')
const auth = require('../middleware/auth');

router.route('/')
    .get(messageCtrl.postAllMessages)
  //   à modifier après avoir MAJ authentification
  //  .get(auth, messageCtrl.postAllMessages)
    .post(messageCtrl.createOneMessage)
   // .post(auth, messageCtrl.createOneMessage)

router.route('/:id')
    .get(auth, messageCtrl.postOneMessage)
    .delete(auth, messageCtrl.deleteOneMessage)
    .put(auth, messageCtrl.editOneMessage)

module.exports = router;