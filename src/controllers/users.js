const { param, body } = require('express-validator');

const User = require('../models/user');
const Role = require('../models/role');

const checkMongodbId = require('../middlewares/validators/checkMongodbId');

function validate(method) {
	switch (method) {
		case 'createNewUser':
			return [
				body('name').exists().notEmpty().isString().trim(),
				body('email').exists().notEmpty().isString().trim().isEmail(),
				body('password').exists().notEmpty().isString().trim(),
				body('roleId')
					.exists()
					.notEmpty()
					.isString()
					.trim()
					.custom(checkMongodbId),
			];
		case 'deleteUser':
			return [
				param('userId')
					.exists()
					.notEmpty()
					.isString()
					.trim()
					.custom(checkMongodbId),
			];
		default:
			return [];
	}
}

async function getUsers(req, res, next) {
	try {
		const users = await User.find({});
		return res.status(200).json(users);
	} catch (err) {
		next(err);
	}
}

async function createNewUser(req, res, next) {
	try {
		const { name, email, password, roleId } = req.body;

		const role = await Role.findById(roleId);

		if (!role) {
			return res.status(401).json({ message: 'Role not found.' });
		}

		const newUser = new User({ name, email, password, role: role._id });
		const createdUser = await newUser.save();

		return res.status(201).json({ id: createdUser._id });
	} catch (err) {
		console.error(`@@@@ ${err.message}`);
		next(err);
	}
}

async function deleteUser(req, res, next) {
	try {
		await User.findOneAndDelete({
			_id: req.params.userId,
		});
		return res.status(200).json({ message: 'Deleted.' });
	} catch (error) {
		next(error);
	}
}

const userController = {
	validate,
	getUsers,
	createNewUser,
	deleteUser,
};

module.exports = userController;
