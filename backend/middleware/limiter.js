const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30 // maximum de 30 requêtes
  });

  module.exports = limiter



  ///// Modifier le nombre de requêtes pour la mise en production