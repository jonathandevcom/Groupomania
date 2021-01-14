const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10 // maximum de 10 requêtes
  });

  module.exports = limiter