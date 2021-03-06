const db = require("../models/connect");
const { success, error } = require("../middleware/functions");
const e = require("express");

// Récupération de tous les likes
exports.getAllLikes = function(req, res) {
    db.query("SELECT *, SUM(likes) AS numberLikes FROM likes GROUP BY id_messages_likes HAVING SUM(id_messages_likes)", (err, result)=> {
        if (err) {
            res.status(400).json(error(err.message));
          } else {
            res.status(200).json(success(result));
          }
    })
}

// Système de likes
exports.createOneLike = function(req, res) {
    db.query(
        "SELECT * FROM likes WHERE id_users_likes = ? AND id_messages_likes = ?",
        [
            req.body.id_users_likes, 
            req.body.id_messages_likes
        ],
        (err, result) => {
            console.log(result[0]);
            if (err) {
                res.status(400).json(error("iciiiiiiiiii" + err.message));
            } else {
                if (result[0] != undefined) {
                if (result[0].likes === 0) {
                    console.log(result[0].id_likes);
                    db.query(
                        "UPDATE likes SET likes = 1 WHERE id_likes = ?",
                        [result[0].id_likes],
                    (err, result) => {
                        if (err) {
                          res.status(400).json("laaaaaaaaaaaaa" + error(err.message));
                        } else {
                           res.status(201).json(success("Like +1"));
                        }
                      } )
                } else if (result[0].likes === 1)  {
                    db.query(
                        "UPDATE likes SET likes = 0 WHERE id_likes = ?",
                        [result[0].id_likes],
                        (err, result) => {
                            if (err) {
                              res.status(400).json("ouuuuuuuuu " + error(err.message));
                            } else {
                               res.status(201).json(success("like -1"));
                            }
                          }
                    )}
                } else {
                    db.query(
                    "INSERT INTO likes (id_users_likes, id_messages_likes, likes) VALUE (?, ?, 1)",
                    [
                        req.body.id_users_likes,
                        req.body.id_messages_likes                        
                    ],
                    (err, result) => {
                        if (err) {
                          res.status(400).json("iiiiiii" + error(err.message));
                        } else {
                           res.status(201).json(success("Like added"));
                        }
                      })
                }
            }
        }
        )
}