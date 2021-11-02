const checkRole = (roleNames) => {
	return async function (req, res, next) {
		try {
			if (roleNames.includes(req.decodedToken.role.name)) {
				next();
			} else {
				const err = new Error('You are not authorized to perform this action');
				err.statusCode = 403;
				throw err;
			}
		} catch (err) {
			next(err);
		}
	};
};

module.exports = checkRole;
