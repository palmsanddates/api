const jwt = require('jsonwebtoken');
const checkRole = (roleNames) => {
	return async function (req, res, next) {
		try {
			const token = req.header('Authorization').replace('Bearer ', '');
			const decoded = jwt.verify(token, process.env.SECRET);
			if (!roleNames.includes(decoded.role.name)) {
				throw new Error('You are not authorized to perform this action');
			}
			next();
		} catch (e) {
			res.status(403).json({ error: e.message });
		}
	};
};

module.exports = checkRole;
