const db = require("../models/connect");
const { success, error } = require("../middleware/functions");
const {
  selectMessagesMax,
  selectMessageId,
  selectMessagesJoinUsers,
  insertMessages,
  deleteMessageComments,
} = require("../models/message");
const { selectUserId } = require("../models/users");
const fs = require("fs");

// Récupération de tous les messages
exports.getAllMessages = (req, res, next) => {
  if (req.query.max != undefined && req.query.max > 0) {
    db.query(selectMessagesMax(), [req.query.max], (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        res.status(200).json(success(result));
      }
    });
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
      `${req.protocol}://${req.get("host")}/assets/images-gif/${
        req.file.filename
      }`,
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
  db.query(selectUserId(), [req.userId.userId], (err, result) => {
    if (err) {
      res.status(400).json(error(err.message));
    } else {
      if (result[0] != undefined) {
        const user = result[0];
        db.query(selectMessageId(), [req.params.id], (err, result) => {
          if (err) {
            res.status(400).json(error(err.message));
          } else {
            if (
              req.userId.userId == result[0].id_users_messages ||
              user.isAdmin == 1
            ) {
              const filename = result[0].image.split(
                "http://localhost:3000/assets/images-gif/"
              )[1];
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
              res.status(403).json(error("No authentication"));
            }
          }
        });
      } else {
        res.status(404).json(error("Wrong id"));
      }
    }
  });
};
