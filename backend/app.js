const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const helmet = require("helmet");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());

/* app.get('/', (req, res)=> {
  res.redirect(304, 'http://localhost:8080');
 }),
*/
///// Accès control pour éviter les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

///// Enregistrement des routeurs
app.use("/api/users", userRoutes);
app.use("/api/forum", messageRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
