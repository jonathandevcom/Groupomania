const jwt = require("jsonwebtoken");
const db = require("../models/connect");
const { selectUserId } = require("../models/users");

require("dotenv").config();

///// Utilisation d'une authentification spécifique pour la modification de la photo de profile. Utilisation de la fonction new FormData() qui ne permet pas de récupérer le req.body.id_users. Utilisation de req.params.id afin de comparer l'id de la demande avec l'id du token
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (user.userId) {
        db.query(selectUserId(), [user.userId], (err, result) => {
          if (err) {
            res.status(400).json(err.message);
          } else {
            if (req.params.id == user.userId || result[0].isAdmin == 1) {
               next();
            } else {
              res.status(403);
            }
          }
        });
      }
    });
  } else {
    res.status(401);
  }
};

