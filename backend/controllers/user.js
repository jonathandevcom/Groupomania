require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../middleware/connect");
const { success, error } = require("../middleware/functions");
const schema = require('../middleware/schemaPassword.js');


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



// Création d'un nouvel utilisateur
exports.createOneUser = (req, res) => {
 if (schema.validate(req.body.password)){
  if (req.body.userName) {
    db.query(
      "SELECT * FROM users WHERE userName = ? OR email = ?",
      [req.body.userName, req.body.email],
      async (err, result) => {
        if (err) {
          res.status(400).json(error(err.message));
        } else {
          if (result[0] != undefined) {
            res.status(404).json(error("User name or email already taken"));
          } else {
            let hashedPassword = await bcrypt.hash(req.body.password, 8);
            db.query(
              `INSERT INTO users (email, userName, password, bio, photo) VALUES (?, ?, ?, ?, ?)`,
              [
                req.body.email,
                req.body.userName,
                hashedPassword,
                req.body.bio,
                req.body.photo,
              ],
              (err, result) => {
                if (err) {
                  res.status(400).json(error(err.message));
                } else {
                  db.query(
                    "SELECT * FROM users WHERE userName = ?",
                    [
                      req.body.id,
                      req.body.email,
                      req.body.userName,
                      hashedPassword,
                      req.body.bio,
                      req.body.isAdmin,
                      req.body.photo,
                    ],
                    (err, result) => {
                      if (err) {
                        res.status(400).json(error(err.message));
                      } else {
                      /* 
                       jwt.sign({user}, 'secretkey', { expiresIn: '24h' }, (err, token) => {
                            res.json({
                              token
                            });
                          });
                       */ 
                        res.status(201).json(success("User added"));


                        
                      }
                    }
                  );
                }
              }
            );
          }
        }
      }
    );
  } else {
    res.status(404).json(error("No name value"));
  }} else {
    res.status(400).json(error("Password no accept"))
  }
};

// suppression d'un utilisateur
exports.deleteOneUser = (req, res) => {
  db.query(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        if (result[0] != undefined) {
          db.query(
            "DELETE FROM users WHERE id = ?",
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
};

// modification d'un utilisateur
exports.editOneUser = (req, res) => {
  if (req.body.userName) {
    db.query(
      "SELECT * FROM users WHERE id = ?",
      [req.params.id],
      (err, result) => {
        if (err) {
          res.json(error(err.message));
        } else {
          if (result[0] != undefined) {
            db.query(
              "SELECT * FROM users WHERE userName= ? AND id != ?",
              [
                req.body.email,
                req.body.userName,
                req.body.password,
                req.body.bio,
                req.body.photo,
              ],
              (err, result) => {
                if (err) {
                  res.json(error(err.message));
                } else {
                  if (result[0] != undefined) {
                    res.json(error("same name"));
                  } else {
                    db.query(
                      "UPDATE users SET email = ?, userName = ?, password = ?, bio = ?, photo = ? WHERE id = ?",
                      [
                        req.body.email,
                        req.body.userName,
                        req.body.password,
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
};
/*
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400);
    }
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, results) => {
        console.log(results);
        if (
          !results ||
          !(await bcrypt.compare(password, results[0].password))
        ) {
          res.status(401);
        } else {
          const id = results[0].id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          console.log("The token is: " + token);
          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
          res.cookie("jwt", token, cookieOptions);
          res.status(200).redirect("/");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
*/

// Récupération d'un utilisateur avec son id
exports.selectOneUser = (req, res) => {
  db.query(
    "SELECT * FROM users WHERE id = ?",
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