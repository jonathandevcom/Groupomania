const express = require('express');
const router = express.Router();

// Problème sur mongoose schema
//const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth')
//const multer = require('../middleware/multer-config')


//router.get('/', auth, postCtrl.getAllPost);
//router.post('/', auth, multer, postCtrl.createPost);
//router.get('/:id', auth, postCtrl.getOnePost);
//router.put('/:id', auth, multer, postCtrl.modifyPost);
//router.delete('/:id', auth,posteCtrl.deletePost);
//router.post('/:id/like', auth, postCtrl.like);


module.exports = router;
