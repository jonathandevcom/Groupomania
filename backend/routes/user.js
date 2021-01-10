const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')

router.get('/', userCtrl.selectAllUsers)
router.get('/:id', userCtrl.selectOneUser)
router.post('/', userCtrl.createOneUser)
router.delete('/:id', userCtrl.deleteOneUser)
router.put('/:id', userCtrl.editOneUser)

module.exports = router;