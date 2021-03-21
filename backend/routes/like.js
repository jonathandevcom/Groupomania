const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/like')

router.route('/totalLikes')
    // afficher le totale des likes
    .get(messageCtrl.totalAllLikes)
    
router.route('/')
    // afficher tous les likes
    .get(messageCtrl.getAllLikes)

router.route('/:id')
    // ajouter ou enlever un like
    .post(messageCtrl.createOneLike)

module.exports = router;