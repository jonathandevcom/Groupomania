const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config')
const limiter = require('../middleware/limiter')


router.route('/')
    .get(userCtrl.selectAllUsers)
    .post(multer, userCtrl.createOneUser)

router.route('/:id')
    .get(userCtrl.selectOneUser)
    .get(limiter, userCtrl.login)
    .delete(userCtrl.deleteOneUser)
    .put(multer, userCtrl.editOneUser)

module.exports = router;