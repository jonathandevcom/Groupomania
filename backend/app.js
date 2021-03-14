const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const app = express();
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const commentsRoutes = require("./routes/comment");
const likesRoutes = require("./routes/like");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());

///// Accès controle pour éviter les erreurs de CORS
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
app.use("/api/comments", commentsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/assets/images-profile", express.static(path.join(__dirname, "assets/images-profile"))
);
app.use("/assets/images-gif", express.static(path.join(__dirname, "assets/images-gif")));

module.exports = app;
