const jwt = require("jsonwebtoken");
const db = require("../models/connect");
const { selectUserId } = require("../models/users");

require("dotenv").config();

///// Création d'une authentification avec TOKEN
module.exports = (req, res, next) => {  
// récupération du headers authorization avec le token 
  const authHeader = req.headers.authorization;
  if (authHeader) {
// création d'une constante token avec uniquement le token crypté
    const token = authHeader.split(" ")[1];
// vérification du token     
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (user.userId) {
        // requête afin de vérifier si l'utilisateur est un admin
        db.query(selectUserId(), [user.userId], (err, result) => {
          if (err) {
            res.status(400).json(err.message);
          } else {
            // comparaison de l'id de la requête avec l'id du token OU vérification si l'user est un admin
            if (req.body.id_users == user.userId || result[0].isAdmin == 1) {
              next();
            } else {
              res.status(401).json(error("authentication refused"));
            }
          }
        });
      }
    });
  } else {
    res.status(403).json(error("No authentication"));
  }
};

