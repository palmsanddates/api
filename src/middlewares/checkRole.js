const jwt = require('jsonwebtoken');
const checkRole = (roleNames) => {
	return async function (req, res, next) {
		try {
			const authHeader = req.get('Authorization');
			if (!authHeader) {
				const err = new Error('Not authenticated.');
				err.statusCode = 401;
				throw err;
			}
			const token = authHeader.replace('Bearer ', '');
			let decoded;
			try {
				decoded = jwt.verify(token, process.env.SECRET);
			} catch (err) {
				err.statusCode = 401;
				throw err;
			}
			if (roleNames.includes(decoded.role.name)) {
				next();
			} else {
				const err = new Error('You are not authorized to perform this action');
				err.statusCode = 403;
				throw err;
			}
		} catch (err) {
			res.status(err.statusCode).json({ message: err.message });
		}
	};
};

module.exports = checkRole;
