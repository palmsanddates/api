const Role = require('../models/role');
const { body } = require('express-validator');

function validate(method) {
	switch (method) {
		case 'createNewRole':
			return [body('name').exists().notEmpty().isString().trim()];
		default:
			return [];
	}
}

async function getRoles(req, res, next) {
	try {
		const roles = await Role.find({});
		return res.status(200).json(roles);
	} catch (error) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
}

async function createNewRole(req, res, next) {
	try {
		const { name } = req.body;
		const newRole = new Role({ name });
		const createdRole = await newRole.save();

		return res.status(201).json({ id: createdRole._id });
	} catch (error) {
		res.status(error.statusCode || 500).json({ message: error.message });
	}
}

const roleController = {
	validate,
	getRoles,
	createNewRole,
};

module.exports = roleController;
