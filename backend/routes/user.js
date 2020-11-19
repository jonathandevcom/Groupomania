const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const rateLimit = require("express-rate-limit");

router.post('/signup', userCtrl.signup);

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 5 
  });
  
router.post('/login', limiter, userCtrl.login);

module.exports = router;
