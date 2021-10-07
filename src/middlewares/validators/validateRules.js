const { validationResult } = require('express-validator');

const validateRules = async (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) return next();

  const error = new Error(`Errors in request input.`);
  error.statusCode = 500;
  error.data = { errors: result.errors };
  return next(error);
};

module.exports = validateRules;
