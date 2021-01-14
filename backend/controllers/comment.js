require("dotenv").config();
const db = require("../middleware/connect");
const { success, error } = require("../middleware/functions");

// Récupération de tous les commentaires
exports.postAllComments = (req, res, next) => {
  if (req.query.max != undefined && req.query.max > 0) {
    db.query(
      "SELECT * FROM comments LIMIT 0, ?",
      [req.query.max],
      (err, result) => {
        if (err) {
          res.json(error(err.message));
        } else {
          res.json(success(result));
        }
      }
    );
  } else if (req.query.max != undefined) {
    res.json(error("No post"));
  } else {
    db.query("SELECT * FROM comments", (err, result) => {
      if (err) {
        res.json(error(err.message));
      } else {
        res.json(success(result));
      }
    });
  }
};

// Récupération d'un comment avec son id
exports.postOneComment = (req, res) => {
  db.query(
    "SELECT * FROM comments WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.json(error(err.message));
      } else {
        if (result[0] != undefined) {
          res.json(success(result[0]));
        } else {
          res.json(error("Wrong id"));
        }
      }
    }
  );
};

// Création d'un commentaire
exports.createOneComment = (req, res) => {
  db.query(
    "INSERT INTO comments (text) VALUE (?)",
    [req.body.text],
    (err, result) => {
      if (err) {
        res.json(error(err.message));
      } else {
        res.json(success("Comment added"));
      }
    }
  );
};

// suppression d'un commentaire
exports.deleteOneComment = (req, res) => {
  db.query(
    "SELECT * FROM comments WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.json(error(err.message));
      } else {
        if (result[0] != undefined) {
          db.query(
            "DELETE FROM comments WHERE id = ?",
            [req.params.id],
            (err, result) => {
              if (err) {
                res.json(error(err.message));
              } else {
                res.json(success(true));
              }
            }
          );
        } else {
          res.json(error("Wrong id"));
        }
      }
    }
  );
};

// modification un commentaire
exports.editOneComment = (req, res) => {
  if (req.body.text) {
    db.query(
      "SELECT * FROM comments WHERE id = ?",
      [req.params.id],
      (err, result) => {
        if (err) {
          res.json(error(err.message));
        } else {
          db.query(
            "UPDATE comments SET text = ?",
            [req.body.text],
            (err, result) => {
              if (err) {
                res.json(error(err.message));
              } else {
                res.json(success(true));
              }
            }
          );
        }
      }
    );
  } else {
    res.json(error("no name value"));
  }
};
