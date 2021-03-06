const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message')
const auth = require('../middleware/auth-message');
const multer = require('../middleware/multer-gif');

router.route('/')
    // affichage de toutes les publications
    .get(messageCtrl.getAllMessages)
    // ajout d'une publication
    .post(multer, messageCtrl.createOneMessage)
 
router.route('/:id')
    // supprimer un utilisateur
    .delete(messageCtrl.deleteOneMessage)

module.exports = router;





///////////////// ajouter l'auth