const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const path = require('path');
const helmet = require("helmet");
require('dotenv').config()

// Connexion à la base de données


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_development', 'root', process.env.RootPassword, {
  host: 'localhost',
  dialect: 'mysql'
}); 




/*
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

*/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
 
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/message', messageRoutes);
  app.use('/api/auth', userRoutes);

module.exports = app;
