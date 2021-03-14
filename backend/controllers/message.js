const db = require("../models/connect");
const { success, error } = require("../middleware/functions");
const { selectMessagesMax, selectMessageId, selectMessagesJoinUsers,insertMessages, deleteMessageComments } = require("../models/message")
const fs = require('fs');

// Récupération de tous les messages
exports.getAllMessages = (req, res, next) => {
  if (req.query.max != undefined && req.query.max > 0) {
    db.query(
      selectMessagesMax(),
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
    db.query(selectMessagesJoinUsers(), (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        res.status(200).json(success(result));
      }
    });
  }
};

// Création d'un message
exports.createOneMessage = (req, res) => {
  db.query(
    insertMessages(),
    [
      req.body.id_users_messages,
      `${req.protocol}://${req.get("host")}/assets/images-gif/${req.file.filename}`,
      req.body.text,
    ],
    (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        res.status(201).json(success("Message added"));
      }
    }
  );
};

// suppression d'un message
exports.deleteOneMessage = (req, res) => {
  db.query(
    selectMessageId(),
    [req.params.id],
    (err, result) => {
      console.log(result[0]);
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        if (result[0] != undefined) {
          const filename = result[0].image.split('http://localhost:3000/assets/images-gif/')[1];
          db.query(
            deleteMessageComments(),
            [req.params.id],
            (err, result) => {
              if (err) {
                res.status(400).json(error(err.message));
              } else {
                res.status(200).json(success("Message deleted"));
                fs.unlinkSync(`assets/images-gif/${filename}`);
              }
            }
          );
        } else {
          res.status(404).json(error("Wrong id"));
        }
      }
    }
  );
};
