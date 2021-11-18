const { validationResult } = require('express-validator');
const AppError = require('../../util/appError');

const validateRules = async (req, res, next) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			let errors = result.array().map((err) => err.msg);
			errors = errors.reduce((acc, curr) => acc + curr, '');
			console.log(errors);
			throw new AppError(errors, 500);
		}
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = validateRules;
