const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const commentRoutes = require("./routes/comment");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use("/api/comment", commentRoutes);

module.exports = app;
