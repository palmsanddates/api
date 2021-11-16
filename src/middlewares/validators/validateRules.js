const { validationResult } = require('express-validator');

const validateRules = async (req, res, next) => {
	const result = validationResult(req);

	if (result.isEmpty()) return next();

	const err = new Error(`Errors in request input.`);
	err.statusCode = 500;
	err.data = { errors: result.errors };
	return next(error);
};

module.exports = validateRules;
