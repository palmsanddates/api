const jwt = require('jsonwebtoken');
const User = require('../models/user');

const checkAuth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.SECRET);
		req.decodedToken = decoded;
		const user = await User.findById(decoded._id);

		if (!user) {
			throw new Error();
		}

		req.token = token;
		req.user = user;
		next();
	} catch (e) {
		res.status(401).json({ message: e.message });
	}
};

module.exports = checkAuth;
