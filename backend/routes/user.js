const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config')
const limiter = require('../middleware/limiter')

router.post('/login', userCtrl.login);


router.route('/')
    .get(userCtrl.selectAllUsers)
    .post(multer, userCtrl.createOneUser)

router.route('/:id')
    
    .post(userCtrl.selectOneUser)
  //  .get(limiter, userCtrl.login)
    .get(userCtrl.selectOneUser)
    .delete(userCtrl.deleteOneUser)
    .put(multer, userCtrl.editOneUser)

    

module.exports = router;