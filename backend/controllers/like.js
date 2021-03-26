const db = require("../models/connect");
const { success, error } = require("../middleware/functions");
const {
  selectTotalLikes,
  selectLikes,
  selectLikesId,
  updateLike1,
  updateLike0,
  insertLike,
} = require("../models/like");

// Récupération de tous les likes
exports.totalAllLikes = function (req, res) {
  db.query(selectTotalLikes(), (err, result) => {
    if (err) {
      res.status(400).json(error(err.message));
    } else {
      res.status(200).json(success(result));
    }
  });
};

exports.getAllLikes = function (req, res) {
  db.query(selectLikes(), (err, result) => {
    if (err) {
      res.status(400).json(error(err.message));
    } else {
      res.status(200).json(success(result));
    }
  });
};

// Système de likes
exports.createOneLike = function (req, res) {
  db.query(
    selectLikesId(),
    [req.body.id_users_likes, req.body.id_messages_likes],
    (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        if (result[0] != undefined) {
          if (result[0].likes === 0) {
            db.query(updateLike1(), [result[0].id_likes], (err, result) => {
              if (err) {
                res.status(400).json(error(err.message));
              } else {
                res.status(201).json(success("Like +1"));
              }
            });
          } else if (result[0].likes === 1) {
            db.query(updateLike0(), [result[0].id_likes], (err, result) => {
              if (err) {
                res.status(400).json(err.message);
              } else {
                res.status(201).json(success("like -1"));
              }
            });
          }
        } else {
          db.query(
            insertLike(),
            [req.body.id_users_likes, req.body.id_messages_likes],
            (err, result) => {
              if (err) {
                res.status(400).json(error(err.message));
              } else {
                res.status(201).json(success("Like added"));
              }
            }
          );
        }
      }
    }
  );
};
