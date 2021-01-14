const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment')
const auth = require('../middleware/auth')

router.route('/')
    .get(auth, commentCtrl.postAllComments)
    .post(auth, commentCtrl.createOneComment)


router.route('/:id')
    .get(auth, commentCtrl.postOneComment)
    .delete(auth, commentCtrl.deleteOneComment)
    .put(auth, commentCtrl.editOneComment)

module.exports = router;