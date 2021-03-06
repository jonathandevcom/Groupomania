const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/like')
const auth = require('../middleware/auth');

router.route('/')
    .get(messageCtrl.getAllLikes)

router.route('/:id')
    .post(messageCtrl.createOneLike)

module.exports = router;