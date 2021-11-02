const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AppError = require('../utils/appError');

const checkAuth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.SECRET);
		req.decodedToken = decoded;
		const user = await User.findById(decoded._id);

		if (!user) {
			throw new AppError('User not found', 401);
		}

		req.token = token;
		req.user = user;
		next();
	} catch (e) {
		next(e);
	}
};

module.exports = checkAuth;
