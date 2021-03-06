const passwordValidator = require("password-validator");
const schema = new passwordValidator();

schema.is().min(8).has().uppercase().has().lowercase().symbols([1]);

module.exports = schema;
