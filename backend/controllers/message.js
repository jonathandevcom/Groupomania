require("dotenv").config();
const db = require("../middleware/connect");
const { success, error } = require("../middleware/functions");

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
    [req.file, req.body.text],

    (err, result) => {
      if (err) {
        res.json(error(err.message));
      } else {
         res.json(success("Message added"));
      }
    }
  );
};


//    imageUrl = `${req.protocol}:${req.get('host')}/images/${req.file}`,
/*
exports.createOneMessage = (req, res) => {
  if (req.body.text) {
    console.log(req.body.text);
      db.query(
    "SELECT * FROM messages WHERE image = ? OR text = ?",
        [req.file, req.body.text],
        async (err, result) => {
          console.log(req.text);
          if (err) {
            res.status(400).json(error( "ici     " + err.message));
          } else {
            if (result[0] != undefined) {
              res.status(404).json(error("Image or com already taken"));
            } else {
              db.query("INSERT INTO messages (image, text) VALUE (?, ?)",
              [req.file, req.body.text],
       //       imageUrl = `${req.protocol}:${req.get('host')}/images/${req.file}`,
              (err, result) => {
                if (err) {
                  res.status(400).json(error("la     " + err.message));
                } else {
                  db.query (
                    "SELECT * FROM messages WHERE id = ?",
                    [req.body.id, 
                      req.file, 
                      req.body.text],
                      (err, result) => {
                        if (err) {
                          res.status(400).json(error(err.message));
                        } else {
                      res.status(201).json(success("Message added"));
                      }
                      }               
                )                  
              }              
            }
            )
          }
        }      
    })   
  } else {
      res.status(404).json(error("Not image"));
}}
*/

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
