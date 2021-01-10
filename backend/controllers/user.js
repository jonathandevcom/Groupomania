const mysql = require("mysql")
require('dotenv').config()

///// Connexion à la base de donnée
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
})

const {success, error} = require('../functions')

// Récupation tous les utilisateurs
exports.selectAllUsers = (req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {

        db.query('SELECT * FROM users LIMIT 0, ?', [req.query.max], (err, result) => {
            if (err) {
                res.json(error(err.message))
            } else {
                res.json(success(result))
            }
        })

    } else if (req.query.max != undefined) {
        res.json(error('Wrong max value'))
    } else {

        db.query('SELECT * FROM users', (err, result) => {
            if (err) {
                res.json(error(err.message))
            } else {
                res.json(success(result))
            }
        })

    }
}

// Récupération d'un utilisateur avec son id
exports.selectOneUser = (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
                res.json(error(err.message))
            }
            else {

                if (result[0] != undefined) {
                res.json(success(result[0]))
            } else {
                res.json(error('Wrong id'))
            }}
    })}

// Création d'un nouvel utilisateur
exports.createOneUser = (req, res) => {
    if (req.body.userName) {
         db.query('SELECT * FROM users WHERE userName = ? OR email = ?', [req.body.userName, req.body.email], (err, result) => {
             if (err) {
                 res.json(error(err.message))
             } else {
                 if (result[0] != undefined) {
                     res.json(error('User name or email already taken'))
                 } else {
         db.query(`INSERT INTO users (email, userName, password, bio, photo) VALUES (?, ?, ?, ?, ?)`, [req.body.email, req.body.userName, req.body.password, req.body.bio, req.body.photo], (err, result) => {
         if (err) {
         res.json(error(err.message))
          } else {
         db.query('SELECT * FROM users WHERE userName = ?', [req.body.id, req.body.email, req.body.userName, req.body.password, req.body.bio, req.body.isAdmin, req.body.photo], (err, result) => {
             if (err) {
                 res.json(error(err.message))
             } else {
                 res.json(success("User added"))
             }
         })
     }
 })
}
}
})
} else {
res.json(error('no name value'))
}}

// suppression d'un utilisateur
exports.deleteOneUser = (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.json(error(err.message))
        } else {

            if (result[0] != undefined) {

                db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {
                        res.json(success(true))
                    }
                })

            } else {
                res.json(error('Wrong id'))
            }

        }
    })
}

// modification d'un utilisateur
exports.editOneUser = (req, res) => {
    if (req.body.userName) {

   db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
       if (err) {
           res.json(error(err.message))
       } else {

           if (result[0] != undefined) {
               db.query('SELECT * FROM users WHERE userName= ? AND id != ?', [req.body.email, req.body.userName, req.body.password, req.body.bio, req.body.photo], (err, result) => {
                   if (err) {
                       res.json(error("ici  " + err.message))
                   } else {

                       if (result[0] != undefined) {
                           res.json(error('same name'))
                       } else {
                           db.query('UPDATE users SET email = ?, userName = ?, password = ?, bio = ?, photo = ? WHERE id = ?', [req.body.email, req.body.userName, req.body.password, req.body.bio, req.body.photo, req.params.id], (err, result) => {
                               if (err) {
                                   res.json(error("la   " + err.message))
                               } else {
                                   res.json(success(true))
                               }
                           })

                       }

                   }
               })
           } else {
               res.json(error('Wrong id'))
           }
       }
   })
} else {
   res.json(error('no name value'))
}
}


