const express = require('express');
const router = express.Router();
const checkRole = require('../middlewares/checkRole');

const userController = require('../controllers/users');
const { validate, getUsers, createNewUser, deleteUser } = userController;
const validateRules = require('../middlewares/validators/validateRules');

router.get('/', getUsers);
router.post(
	'/',
	checkRole(['super admin']),
	validate('createNewUser'),
	validateRules,
	createNewUser,
);
router.delete(
	'/:userId',
	checkRole(['super admin']),
	validate('deleteUser'),
	validateRules,
	deleteUser,
);

module.exports = router;
