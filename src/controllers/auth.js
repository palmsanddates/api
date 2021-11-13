const { body } = require('express-validator');
import AppError from '../util/appError';

const User = require('../models/user');
const Role = require('../models/role');
const jwt = require('jsonwebtoken');

function validate(method) {
	switch (method) {
		case 'generateToken':
			return [
				body('email')
					.exists()
					.notEmpty()
					.isString()
					.trim()
					.isEmail()
					.withMessage('Email is not in the correct format')
					.contains('dominican.edu')
					.withMessage('Email must be dominican.edu'),
				body('password')
					.exists()
					.notEmpty()
					.isString()
					.trim()
					.isLength({ min: 3, max: 30 })
					.withMessage('Password must be between 3 and 30 characters'),
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
			throw new AppError('Wrong Email or Password', 401);
		}

		const isMatch = await user.validatePassword(password);

		if (!isMatch) {
			throw new AppError('Wrong Email or Password', 401);
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
