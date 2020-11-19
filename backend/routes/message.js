const express = require('express');
const router = express.Router();

// Problème sur mongoose schema
const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth')
//const multer = require('../middleware/multer-config')


router.get('/', auth, messageCtrl.getAllMessage);
//router.post('/', auth, multer, messageCtrl.createMessage);
router.get('/:id', auth, messageCtrl.getOneMessage);
//router.put('/:id', auth, multer, messageCtrl.modifyMessage);
router.delete('/:id', auth, messageCtrl.deleteMessage);
router.post('/:id/like', auth, messageCtrl.like);


module.exports = router;
