const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5 // maximum de 5 requêtes
  });

  module.exports = limiter