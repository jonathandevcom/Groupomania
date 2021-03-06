const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/comment')
const auth = require('../middleware/auth');

router.route('/')
    // afficher tous les commentaires
    .get(messageCtrl.getAllComment)
    // ajouter un commentaire
    .post(messageCtrl.createOneComment)

router.route('/:id')
    // supprimer un commentaire
    .delete(messageCtrl.deleteOneComment)

module.exports = router;



/////////////// ajouter auth