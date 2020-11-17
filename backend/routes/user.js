const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const rateLimit = require("express-rate-limit");

router.post('/signup', userCtrl.signup);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10 
  });
  
router.post('/login', limiter, userCtrl.login);

module.exports = router;
