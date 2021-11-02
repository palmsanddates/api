const { body } = require('express-validator');

const User = require('../models/user');
const Role = require('../models/role');
const jwt = require('jsonwebtoken');

function validate(method) {
	switch (method) {
		case 'generateToken':
			return [
				body('email').exists().notEmpty().isString().trim().isEmail(),
				body('password').exists().notEmpty().isString().trim(),
			];
		default:
			return [];
	}
}

async function generateToken(req, res, next) {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ message: 'Wrong Email or Password' });
		}

		const isMatch = await user.validatePassword(password);

		if (!isMatch) {
			return res.status(401).json({ message: 'Wrong Email or Password' });
		}

		const role = await Role.findById(user.role);
		const token = jwt.sign(
			{ _id: user._id, email: user.email, role: role },
			process.env.SECRET,
			{
				expiresIn: '1 hour',
			},
		);

		return res.status(200).json({ token });
	} catch (error) {
		next(error);
	}
}

const authController = {
	validate,
	generateToken,
};

module.exports = authController;
