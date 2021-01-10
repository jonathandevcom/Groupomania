const mysql = require("mysql")
require('dotenv').config()

///// Connexion à la base de donnée
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
})

db.connect((err) => {
    if (err) {
        console.log(err.message)
 } else {
        console.log('Database connected')
    }
})

module.exports = db
