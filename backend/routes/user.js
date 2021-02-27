const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-profile');
const limiter = require('../middleware/limiter');
const auth = require('../middleware/auth');

router.post('/login', limiter, userCtrl.login);

router.route('/')
    // afficher tous les utilisateurs : accès réservé à l'administrateur
    .get(userCtrl.selectAllUsers)
    // création d'un utilisateur
    .post(multer, userCtrl.createOneUser)

router.route('/:id')
    // afficher un utilisateur
    .get(userCtrl.selectOneUser)
    // suppréssion d'un utilisateur par son id
    .delete(auth, userCtrl.deleteOneUser)
    // modification d'un utilisateur
    .put(auth, multer, userCtrl.editOneUser)

router.route('/:id/editUserName')
    .put(auth, multer, userCtrl.editUserName)

router.route('/:id/editEmail')
    .put(auth, multer, userCtrl.editEmail)

router.route('/:id/editFile')
    .put(auth, multer, userCtrl.editFile)

module.exports = router;