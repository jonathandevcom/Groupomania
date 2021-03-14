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
        // || (req.isAdmin = 1)
        next()
      }
    });
  } else {
    res.status(401);
  }
};