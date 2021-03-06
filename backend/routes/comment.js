const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/comment')
const auth = require('../middleware/auth');

router.route('/')
    .get(messageCtrl.getAllComment)
    .post(messageCtrl.createOneComment)

router.route('/:id')
    // ajouter auth
    .delete(messageCtrl.deleteOneComment)

module.exports = router;