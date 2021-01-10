const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
// const userPublication = require('(./routes/publication');
const {success, error} = require('./functions')
const mysql = require('mysql');
const morgan = require('morgan')
require('dotenv').config()
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//   -------------------------------- forumGif

///// Accès control pour éviter les erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

///// Enregistrement des routeurs
app.use('/api/users', userRoutes);

module.exports = app;
