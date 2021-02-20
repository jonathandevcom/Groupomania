const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-profile')
const limiter = require('../middleware/limiter')

router.post('/login', limiter, userCtrl.login);

router.route('/')
    .get(userCtrl.selectAllUsers)
    .post(multer, userCtrl.createOneUser)

router.route('/:id')
    .post(multer, userCtrl.selectOneUser)
    .get(userCtrl.selectOneUser)
    .delete(userCtrl.deleteOneUser)
    .put(multer, userCtrl.editOneUser)

module.exports = router;