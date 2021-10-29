const jwt = require('jsonwebtoken');
import AppError from '../util/appError';

const checkRole = (roleNames) => {
	return async function (req, res, next) {
		const authHeader = req.get('Authorization');
		if (!authHeader) {
			next(new AppError('Not authorized to access this route', 401));
		}
		const token = authHeader.replace('Bearer ', '');
		let decoded;
		try {
			decoded = jwt.verify(token, process.env.SECRET);
		} catch (err) {
			next(new AppError(`${err.message}`, 401));
		}
		if (roleNames.includes(decoded.role.name)) {
			next();
		} else {
			next(new AppError('You are not authorized to perform this action', 403));
		}
	};
};

module.exports = checkRole;
