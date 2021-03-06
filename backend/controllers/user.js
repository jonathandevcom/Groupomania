const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/connect");
const { success, error } = require("../middleware/functions");
const fs = require('fs');

const schema = require("../middleware/schemaPassword.js");

// Création d'un nouvel utilisateur
exports.createOneUser = (req, res) => {
  if (schema.validate(req.body.password)) {
    if (req.body.userName) {
      db.query(
        "SELECT * FROM users WHERE userName = ? OR email = ?",
        [req.body.userName, req.body.email],
        async (err, result) => {
          if (err) {
            res.status(400).json(error(err.message));
          } else {
            if (result[0] != undefined) {
              res.status(400).json(error("User name or email already taken"));
            } else {
              let hashedPassword = await bcrypt.hash(req.body.password, 8);
              if (req.file === undefined) {
                let nameAvatar = "http://localhost:3000/images-profile/avatar.png";
                db.query(
                  `INSERT INTO users (email, userName, password, bio, photo) VALUES (?, ?, ?, ?, ?)`,
                  [
                    req.body.email,
                    req.body.userName,
                    hashedPassword,
                    req.body.bio,
                    nameAvatar,
                  ],
                  (err, result) => {
                    if (err) {
                      res.status(400).json(error(err.message));
                        } else {
                          
                          res.status(201).json(success("User added"));
                        }
                  }
                )
              } else {
              db.query(
                `INSERT INTO users (email, userName, password, bio, photo) VALUES (?, ?, ?, ?, ?)`,
                [
                  req.body.email,
                  req.body.userName,
                  hashedPassword,
                  req.body.bio,
                  `${req.protocol}://${req.get("host")}/images-profile/${req.file.filename}`
                ],
                (err, result) => {
                  if (err) {
                    res.status(400).json(error(err.message));
                      } else {
                        console.log(req.file);
                        res.status(201).json(success("User added"));
                      }
                }
              )}
            }
          }
        }
      );
    } else {
      res.status(404).json(error("No name value"));
    }
  } else {
    res.status(400).json(error("Password no accept"));
  }
};

// Connexion
exports.login = async (req, res) => {
if (req.body.userName) {
  db.query(
    "SELECT * FROM users WHERE userName = ?",
    [req.body.userName],
    async (err, results) => {
  //    console.log(results[0].userName);
     if (err) {
      res.status(400).json(error(err.message));
     } else {
      if (
        (!results ||
        !(await bcrypt.compare(req.body.password, results[0].password)))
     // || (req.body.userName != results[0].userName)
     ) {
        res.status(400).json(error("error password"));
      } else {
        res.status(200).json({
          userId: results[0].id_users,
          token: jwt.sign({ userId: results[0].id_users }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          }),
        });
} 
}
    })
  } else {
    res.status(404).json(error("No name value"));
    }
  }

// Récupération d'un utilisateur avec son id
exports.selectOneUser = (req, res) => {
  db.query(
    "SELECT * FROM users WHERE id_users = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        if (result[0] != undefined) {
          res.status(200).json(success(result[0]));
        } else {
          res.status(404).json(error("Wrong id"));
        }
      }
    }
  );
};

// Récupation tous les utilisateurs
exports.selectAllUsers = (req, res) => {
  if (req.query.max != undefined && req.query.max > 0) {
    db.query(
      "SELECT * FROM users LIMIT 0, ?",
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
    db.query("SELECT * FROM users", (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        res.status(200).json(success(result));
      }
    });
  }
};

// suppression d'un utilisateur
exports.deleteOneUser = (req, res) => {
  db.query(
    "SELECT * FROM users WHERE id_users = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        if (result[0] != undefined) {
          const filename = result[0].photo.split('http://localhost:3000/images-profile/')[1];  
          db.query(
            "DELETE FROM users WHERE id_users = ?",
            [req.params.id],
            (err, result) => {
              if (err) {
                res.status(400).json(error(err.message));
              } else {
                res.status(200).json(success("User deleted"));
                if (filename != "avatar.png") {
                  fs.unlinkSync(`images-profile/${filename}`);
              }
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

// modification d'un utilisateur
exports.editOneUser = (req, res) => {
  if (schema.validate(req.body.password)) {
  if (req.body.userName) {
     db.query(
       "SELECT * FROM users WHERE id_users = ?",
      [req.params.id],
      (err, result) => {
        if (err) {
          res.json(error(err.message));
        } else {
          if (result[0] != undefined) {
            db.query(
              "SELECT * FROM users WHERE userName= ? AND id_users != ?",
              [
                req.body.email,
                req.body.userName,
                req.body.password,
                req.body.bio,
                req.body.photo,
              ],
              async (err, result) => {
                if (err) {
                  res.json(error(err.message));
                } else {
                  if (result[0] != undefined) {
                    res.json(error("same name"));
                  } else {
                    let hashedPassword = await bcrypt.hash(req.body.password, 8);
                    db.query(
                      "UPDATE users SET email = ?, userName = ?, password = ?, bio = ?, photo = ? WHERE id_users = ?",
                      [
                        req.body.email,
                        req.body.userName,
                        hashedPassword,
                        req.body.bio,
                        req.body.photo,
                        req.params.id,
                      ],
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
} else {
  res.status(400).json(error("Password no accept"));
}
};

exports.editUserName = (req, res) => {
   if (req.body.userName) {
     db.query(
       "SELECT * FROM users WHERE id_users = ?",
      [req.params.id],
      (err, result) => {
        if (err) {
          res.json(error(err.message));
        } else {
          if (result[0] != undefined) {
            db.query(
              "SELECT * FROM users WHERE userName= ? AND id_users != ?",
              [
                req.body.email,
                req.body.userName,
                req.body.password,
                req.body.bio,
                req.body.photo,
              ],
              async (err, result) => {
                if (err) {
                  res.json(error(err.message));
                } else {
                  if (result[0] != undefined) {
                    res.json(error("same name"));
                  } else {
                    db.query(
                      "SELECT * FROM users WHERE userName = ?",
                      [req.body.userName],
                      async (err, result) => {
                        if (err) {
                          res.status(400).json(error(err.message));
                        } else {
                          if (result[0] != undefined) {
                            res.status(404).json(error("User name already taken"));
                          } else {
                    let hashedPassword = await bcrypt.hash(req.body.password, 8);
                    db.query(
                      "UPDATE users SET email = ?, userName = ?, password = ?, bio = ?, photo = ? WHERE id_users = ?",
                      [
                        req.body.email,
                        req.body.userName,
                        hashedPassword,
                        req.body.bio,
                        req.body.photo,
                        req.params.id,
                      ],
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
            )}}}
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

exports.editEmail = (req, res) => {
  if (req.body.userName) {
    db.query(
      "SELECT * FROM users WHERE id_users = ?",
     [req.params.id],
     (err, result) => {
       if (err) {
         res.json(error(err.message));
       } else {
         if (result[0] != undefined) {
           db.query(
             "SELECT * FROM users WHERE userName= ? AND id_users != ?",
             [
               req.body.email,
               req.body.userName,
               req.body.password,
               req.body.bio,
               req.body.photo,
             ],
             async (err, result) => {
               if (err) {
                 res.json(error(err.message));
               } else {
                 if (result[0] != undefined) {
                   res.json(error("same name"));
                 } else {
                   db.query(
                     "SELECT * FROM users WHERE email = ?",
                     [req.body.email],
                     async (err, result) => {
                       if (err) {
                         res.status(400).json(error(err.message));
                       } else {
                         if (result[0] != undefined) {
                           res.status(404).json(error("Email name already taken"));
                         } else {
                   let hashedPassword = await bcrypt.hash(req.body.password, 8);
                   db.query(
                     "UPDATE users SET email = ?, userName = ?, password = ?, bio = ?, photo = ? WHERE id_users = ?",
                     [
                       req.body.email,
                       req.body.userName,
                       hashedPassword,
                       req.body.bio,
                       req.body.photo,
                       req.params.id,
                     ],
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
           )}}}
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


// modification d'un utilisateur
exports.editFile = (req, res) => {
  if (req.body.userName) {
     db.query(
       "SELECT * FROM users WHERE id_users = ?",
      [req.params.id],
      (err, result) => {
        if (err) {
          res.json(error(err.message));
        } else 
        {
          if (result[0] != undefined) {
            const filename = result[0].photo.split('http://localhost:3000/images-profile/')[1];  
            if (filename != "avatar.png") {
              fs.unlinkSync(`images-profile/${filename}`);
          }
            db.query(
              "SELECT * FROM users WHERE userName= ? AND id_users != ?",
              [
                req.body.email,
                req.body.userName,
                req.body.password,
                req.body.bio,
                req.body.photo,
              ],
              async (err, result) => {
                if (err) {
                  res.json(error(err.message));
                } else {
                  if (result[0] != undefined) {
                    res.json(error("same name"));
                  } else {

                    db.query(
                      "UPDATE users SET photo = ? WHERE id_users = ?",
                      [
                        `${req.protocol}://${req.get("host")}/images-profile/${req.file.filename}`, 
                        req.params.id,
                      ],
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
              } );
          } else {
            res.json(error("Wrong id"));
          }
        }
      }
    );
  } else {
    res.json(error("no name value"));
  }
} 


