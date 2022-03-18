import { body } from 'express-validator';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import jwt from 'jsonwebtoken';

import AppError from '../util/appError';
import User from '../models/user';
import Role from '../models/role';
import Institution from '../models/institution';

// creating mailgun client;
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: 'api',
	key: process.env.MG_API_KEY,
});

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
		case 'signup':
			return [];
		default:
			return [];
	}
}

async function generateToken(req, res, next) {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) throw new AppError('Wrong Email or Password', 401);

		const isMatch = await user.validatePassword(password);
		if (!isMatch) throw new AppError('Wrong Email or Password', 401);

		const role = await Role.findById(user.role_id);

		const token = jwt.sign(
			{
				_id: user._id,
				email: user.email,
				role: role,
				institution: user.institution_id,
			},
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

async function signup(req, res, next) {
	try {
		const { name, email, institutionId } = req.body;
		const user = await User.findOne({ email });
		const institution = await Institution.findById(institutionId);

		if (user) throw new AppError('User already exists', 400);
		if (!institution) throw new AppError('Institution not found', 404);
		if (!email.endsWith(institution.domain))
			throw new AppError(`Email must be ${institution.domain}`, 400);

		const userRole = await Role.findOne({ name: 'user' });
		const password = Math.random().toString(36).slice(-8);

		const newUser = new User({
			name,
			email,
			password,
			role_id: userRole._id,
			institution_id: institutionId,
		});
		const createdUser = await newUser.save();

		const mailData = {
			from: 'hello@palmsanddates.com',
			to: email,
			subject: 'Welcome to Palms and Dates',
			html: `<h1>Hello and welcome to Palms and Dates!</h1><hr /><br> <p>We are thrilled to have you as a new user. <br> Please use the following password to login to your account: <br> <b>${password}</b></p>`,
		};

		await mg.messages.create(process.env.MG_DOMAIN, mailData);

		const token = jwt.sign(
			{ _id: createdUser._id, email: createdUser.email, role: userRole },
			process.env.SECRET,
			{
				expiresIn: '1 hour',
			},
		);
		return res.status(201).json({ token });
	} catch (err) {
		console.error(err);
		next(err);
	}
}

const authController = {
	validate,
	generateToken,
	signup,
};

module.exports = authController;
