require("dotenv").config();
const db = require("../models/connect");
const { success, error } = require("../middleware/functions");
const fs = require('fs');

// Récupération de tous les messages
exports.postAllMessages = (req, res, next) => {
  if (req.query.max != undefined && req.query.max > 0) {
    db.query(
      "SELECT * FROM messages LIMIT 0, ?",
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
    db.query("SELECT * FROM messages", (err, result) => {
      if (err) {
        res.json(error(err.message));
      } else {
        res.json(success(result));
      }
    });
  }
};

// Récupération d'un message avec son id
exports.postOneMessage = (req, res) => {
  db.query(
    "SELECT * FROM messages WHERE id = ?",
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

// Création d'un message
exports.createOneMessage = (req, res) => {
  console.log(req.file, req.body.text);
  db.query(
    "INSERT INTO messages (image, text) VALUE (?, ?)",
    [req.file.filename, req.body.text],
    (err, result) => {
      if (err) {
        res.json(error(err.message));
      } else {
         res.json(success("Message added"));
      }
    }
  );
};

// suppression d'un message
exports.deleteOneMessage = (req, res) => {
  db.query(
    "SELECT * FROM messages WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.json(error(err.message));
      } else {
        if (result[0] != undefined) {
          db.query(
            "DELETE FROM messages WHERE id = ?",
            [req.params.id],
            (err, result) => {
              if (err) {
                res.json(error(err.message));
              } else {
              //  fs.unlink(`images/${filename}`)
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

// modification un message
exports.editOneMessage = (req, res) => {
  if (req.body.image) {
    db.query(
      "SELECT * FROM messages WHERE id = ?",
      [req.params.id],
      (err, result) => {
        if (err) {
          res.json(error(err.message));
        } else {
          if (result[0] != undefined) {
            db.query(
              "SELECT * FROM messages WHERE image= ? AND id != ?",
              [req.body.image, req.body.text],
              (err, result) => {
                if (err) {
                  res.json(error(err.message));
                } else {
                  if (result[0] != undefined) {
                    res.json(error("same image"));
                  } else {
                    db.query(
                      "UPDATE messages SET image = ?, text = ?",
                      [req.body.image, req.body.text],
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
              }
            );
          } else {
            res.json(error("Wrong id"));
          }
        }
      }
    );
  } else {
    res.json(error("no name value"));
  }
};
