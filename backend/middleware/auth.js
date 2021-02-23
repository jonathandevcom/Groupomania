const jwt = require('jsonwebtoken');
require("dotenv").config();

///// Création d'une authentification avec TOKEN 
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          res.status(403);
        } else {
        req.userId = user
        next()
      }});
    } else {
      res.status(401);
    }
};






/*

const jwt = require('jsonwebtoken');
require("dotenv").config();

///// Création d'une authentification avec TOKEN 
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) {
        res.status(403)
      } else {
        req.userId = user.id
        next()
      }
    });
      
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
*/