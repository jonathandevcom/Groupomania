const db = require("../models/connect");
const { success, error } = require("../middleware/functions");

// Création d'un commentaire
exports.createOneComment = (req, res) => {
  db.query(
    "INSERT INTO comments (id_users_comments, id_messages_comments, comment) VALUES (?, ?, ?)",
    [
      req.body.id_users_comments,
      req.body.id_messages_comments,
      req.body.comment,
    ],
    (err, result) => {
      if (err) {
        res.json(error(err.message));
      } else {
        res.status(201).json(success("Comment added"));
      }
    }
  );
};

// Affichage de tous les commentaires
exports.getAllComment = (req, res) => {
  if (req.query.max != undefined && req.query.max > 0) {
    db.query(
      "SELECT * FROM comments LIMIT 0, ?",
      [req.query.max],
      (err, result) => {
        if (err) {
          res.status(400).json(error(err.message));
        } else {
          res.status(200).json(success(result));
        }
      }
    );
  } else if (req.query.max != undefined) {
    res.status(404).json(error("Wrong max value"));
  } else {
    db.query("SELECT * FROM comments LEFT JOIN users ON comments.id_users_comments = users.id_users", (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        res.status(200).json(success(result));
      }
    });
  }
}

// Suppression d'un commentaire
exports.deleteOneComment = (req, res) => {
  db.query(
    "SELECT * FROM comments WHERE id_comments = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        if (result[0] != undefined) {
          db.query(
            "DELETE FROM comments WHERE id_comments = ?",
            [req.params.id],
            (err, result) => {
              if (err) {
                res.status(400).json(error(err.message));
              } else {
                res.status(200).json(success("User deleted"));
              }
            }
          );
        } else {
          res.status(404).json(error("Wrong id"));
        }
      }
    }
  );
}