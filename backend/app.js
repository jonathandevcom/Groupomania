
const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const path = require('path');
const helmet = require("helmet");
require('dotenv').config()

// Connexion à la base de données

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
 
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/post', postRoutes);
  app.use('/api/auth', userRoutes);

module.exports = app;
