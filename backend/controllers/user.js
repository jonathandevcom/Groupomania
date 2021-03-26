const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/connect");

const fs = require("fs");

const schema = require("../middleware/schemaPassword.js");
const { success, error } = require("../middleware/functions");
const {
  selectUserUserNameOrEmail,
  selectUserId,
  selectUserUserName,
  selectUserBio,
  selectUserMax,
  selectAllUsers,
  selectUserUserNameId,
  selectUserEmail,
  insertUser,
  deleteUser,
  updateUser,
  updateUserUserName,
  updateUserEmail,
  updateUserPhoto,
  updateUserBio,
} = require("../models/users");

// Création d'un nouvel utilisateur
exports.createOneUser = (req, res) => {
  if (schema.validate(req.body.password)) {
    if (req.body.userName) {
      db.query(
        selectUserUserNameOrEmail(),
        [req.body.userName, req.body.email],
        async (err, result) => {
          if (err) {
            res.status(400).json(error(err.message));
          } else {
            if (result[0] != undefined) {
              res.status(401).json(error("User name or email already taken"));
            } else {
              let hashedPassword = await bcrypt.hash(req.body.password, 8);
              if (req.file === undefined) {
                let nameAvatar =
                  "http://localhost:3000/assets/images-profile/avatar.png";
                db.query(
                  insertUser(),
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
                      db.query(
                        selectUserUserName(),
                        [req.body.userName],
                        (err, result) => {
                          if (err) {
                            res.status(400).json(error(err.message));
                          } else {
                            if (result[0] != undefined) {
                              res.status(201).json({
                                isAdmin: result[0].isAdmin,
                                userId: result[0].id_users,
                                token: jwt.sign(
                                  { userId: result[0].id_users },
                                  process.env.JWT_SECRET,
                                  {
                                    expiresIn: process.env.JWT_EXPIRES_IN,
                                  }
                                ),
                              });
                            } else {
                              res.status(404).json(error("Username unknown"));
                            }
                          }
                        }
                      );
                    }
                  }
                );
              } else {
                db.query(
                  insertUser(),
                  [
                    req.body.email,
                    req.body.userName,
                    hashedPassword,
                    req.body.bio,
                    `${req.protocol}://${req.get(
                      "host"
                    )}/assets/images-profile/${req.file.filename}`,
                  ],
                  (err, result) => {
                    if (err) {
                      res.status(400).json(error(err.message));
                    } else {
                      db.query(
                        selectUserUserName(),
                        [req.body.userName],
                        (err, result) => {
                          if (err) {
                            res.status(400).json(error(err.message));
                          } else {
                            if (result[0] != undefined) {
                              res.status(201).json({
                                isAdmin: result[0].isAdmin,
                                userId: result[0].id_users,
                                token: jwt.sign(
                                  { userId: result[0].id_users },
                                  process.env.JWT_SECRET,
                                  {
                                    expiresIn: process.env.JWT_EXPIRES_IN,
                                  }
                                ),
                              });
                            } else {
                              res.status(404).json(error("Username unknown"));
                            }
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          }
        }
      );
    } else {
      res.status(404).json(error("No name value"));
    }
  } else {
    res.status(401).json(error("Password no accept"));
  }
};

// Connexion
exports.login = async (req, res) => {
  if (req.body.userName) {
    db.query(
      selectUserUserName(),
      [req.body.userName],
      async (err, results) => {
        if (err) {
          res.status(404).json(error("Username unknown"));
        } else {
          if (
            !results[0] ||
            !(await bcrypt.compare(req.body.password, results[0].password))
          ) {
            res.status(401).json(error("error password"));
          } else {
            res.status(200).json({
              isAdmin: results[0].isAdmin,
              userId: results[0].id_users,
              token: jwt.sign(
                { userId: results[0].id_users },
                process.env.JWT_SECRET,
                {
                  expiresIn: process.env.JWT_EXPIRES_IN,
                }
              ),
            });
          }
        }
      }
    );
  } else {
    res.status(404).json(error("No name value"));
  }
};

// Récupération d'un utilisateur avec son id
exports.selectOneUser = (req, res) => {
  db.query(selectUserId(), [req.params.id], (err, result) => {
    if (err) {
      res.status(400).json(error(err.message));
    } else {
      if (result[0] != undefined) {
        res.status(200).json(success(result[0]));
      } else {
        res.status(404).json(error("Wrong id"));
      }
    }
  });
};

// Récupation tous les utilisateurs
exports.selectAllUsers = (req, res) => {
  if (req.query.max != undefined && req.query.max > 0) {
    db.query(selectUserMax(), [req.query.max], (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        res.status(200).json(success(result));
      }
    });
  } else if (req.query.max != undefined) {
    res.status(404).json(error("Wrong max value"));
  } else {
    db.query(selectAllUsers(), (err, result) => {
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
  db.query(selectUserId(), [req.userId.userId], (err, result) => {
    if (err) {
      res.status(400).json(error(err.message));
    } else {
      if (result[0] != undefined) {
        const user = result[0];
        if (req.userId.userId == result[0].id_users || user.isAdmin == 1) {
          const filename = result[0].photo.split(
            "http://localhost:3000/assets/images-profile/"
          )[1];
          db.query(deleteUser(), [req.params.id], (err, result) => {
            if (err) {
              res.status(400).json(error(err.message));
            } else {
              res.status(200).json(success("User deleted"));
              if (filename != "avatar.png") {
                fs.unlinkSync(`assets/images-profile/${filename}`);
              }
            }
          });
        } else {
          res.status(403).json(error("No authentication"));
        }
      } else {
        res.status(404).json(error("Wrong id"));
      }
    }
  });
};

////////////// ne fonctionne pas !!!!!

// modification du mot de passe
exports.editOneUser = (req, res) => {
  if (schema.validate(req.body.password)) {
    db.query(selectUserId(), [req.userId.userId], (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        if (result[0] != undefined) {
          const user = result[0];
          db.query(
            selectUserUserNameId(),
            [req.body.userName, req.params.id],
            async (err, result) => {
              if (err) {
                res.status(400).json(error(err.message));
              } else {
                if (result[0] != undefined) {
                  res.json(error("same name"));
                } else {
                  if (req.userId.userId == user.id_users || user.isAdmin == 1) {
                    let hashedPassword = await bcrypt.hash(
                      req.body.password,
                      8
                    );
                    db.query(
                      updateUser(),
                      [req.body.userName, hashedPassword, req.userId.userId],
                      (err, result) => {
                        if (err) {
                          res.status(400).json(error(err.message));
                        } else {
                          res.status(200).json(success(result));
                        }
                      }
                    );
                  } else {
                    res.status(403).json(error("No authentication"));
                  }
                }
              }
            }
          );
        } else {
          res.status(404).json(error("Wrong id"));
        }
      }
    });
  } else {
    res.status(401).json(error("Password no accept"));
  }
};

// Modification du nom d'utilisateur
exports.editUserName = (req, res) => {
  if (req.body.userName) {
    db.query(selectUserId(), [req.userId.userId], (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        const user = result[0];
        db.query(
          selectUserUserName(),
          [req.body.userName],
          async (err, result) => {
            if (err) {
              res.status(400).json(error(err.message));
            } else {
              if (result[0] != undefined) {
                res.status(404).json(error("User name already taken"));
              } else {
                if (req.userId.userId == user.id_users || user.isAdmin == 1) {
                  db.query(
                    updateUserUserName(),
                    [req.body.userName, req.params.id],
                    (err, result) => {
                      if (err) {
                        res.status(400).json(error(err.message));
                      } else {
                        res.status(200).json(success(result));
                      }
                    }
                  );
                } else {
                  res.status(403).json(error("No authentication"));
                }
              }
            }
          }
        );
      }
    });
  } else {
    res.status(404).json(error("No name value"));
  }
};

// modification de l'email
exports.editEmail = (req, res) => {
  if (req.body.email) {
    db.query(selectUserId(), [req.params.id], (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        const user = result[0];
        db.query(selectUserEmail(), [req.body.email], async (err, result) => {
          if (err) {
            res.status(400).json(error(err.message));
          } else {
            if (result[0] != undefined) {
              res.status(401).json(error("Email name already taken"));
            } else {
              if (req.userId.userId == user.id_users || user.isAdmin == 1) {
                db.query(
                  updateUserEmail(),
                  [req.body.email, req.params.id],
                  (err, result) => {
                    if (err) {
                      res.status(400).json(error(err.message));
                    } else {
                      res.status(200).json(success(result));
                    }
                  }
                );
              } else {
                res.status(403).json(error("No authentication"));
              }
            }
          }
        });
      }
    });
  } else {
    res.status(404).json(error("No name value"));
  }
};

// modification de la photo de profile
exports.editFile = (req, res) => {
  if (req.body.userName) {
    db.query(selectUserId(), [req.params.id], (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        if (result[0] != undefined) {
          const user = result[0];
          const filename = result[0].photo.split(
            "http://localhost:3000/assets/images-profile/"
          )[1];
          if (filename != "avatar.png") {
            fs.unlinkSync(`assets/images-profile/${filename}`);
          }
          if (req.userId.userId == user.id_users || user.isAdmin == 1) {
            db.query(
              updateUserPhoto(),
              [
                `${req.protocol}://${req.get("host")}/assets/images-profile/${
                  req.file.filename
                }`,
                req.params.id,
              ],
              (err, result) => {
                if (err) {
                  res.status(400).json(error(err.message));
                } else {
                  res.status(200).json(success(result));
                }
              }
            );
          } else {
            res.status(403).json(error("No authentication"));
          }
        } else {
          res.status(404).json(error("Wrong id"));
        }
      }
    });
  } else {
    res.status(404).json(error("No name value"));
  }
};

// Modification de la biographie
exports.editBio = (req, res) => {
  if (req.body.userName) {
    db.query(selectUserId(), [req.params.id], (err, result) => {
      if (err) {
        res.status(400).json(error(err.message));
      } else {
        const user = result[0];
        db.query(selectUserBio(), [req.body.bio], async (err, result) => {
          if (err) {
            res.status(400).json(error(err.message));
          } else {
            if (result[0] != undefined) {
              res.status(404).json(error(err.message));
            } else {
              if (req.userId.userId == user.id_users || user.isAdmin == 1) {
                db.query(
                  updateUserBio(),
                  [req.body.bio, req.params.id],
                  (err, result) => {
                    if (err) {
                      res.status(400).json(error(err.message));
                    } else {
                      res.status(200).json(success(result));
                    }
                  }
                );
              } else {
                res.status(403).json(error("No authentication"));
              }
            }
          }
        });
      }
    });
  } else {
    res.status(404).json(error("No name value"));
  }
};
