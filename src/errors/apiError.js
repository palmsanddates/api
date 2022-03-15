const BaseError = require('./baseError');
const HttpStatusCode = require('./httpStatusCode');

module.exports = class APIError extends BaseError {
	constructor(
		name,
		httpCode = HttpStatusCode.INTERNAL_SERVER,
		isOperational = true,
		description = 'internal server error',
	) {
		super(name, httpCode, isOperational, description);
	}
};
