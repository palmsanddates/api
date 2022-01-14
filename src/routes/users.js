const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const checkRole = require('../middlewares/checkRole');

const userController = require('../controllers/users');
const { validate, getUsers, createNewUser, deleteUser } = userController;
const validateRules = require('../middlewares/validators/validateRules');

router.get('/', checkAuth, checkRole(['super_admin']), getUsers);
router.post(
	'/',
	checkAuth,
	checkRole(['super_admin']),
	validate('createNewUser'),
	validateRules,
	createNewUser,
);
router.delete(
	'/:userId',
	checkAuth,
	checkRole(['super_admin']),
	validate('deleteUser'),
	validateRules,
	deleteUser,
);

module.exports = router;
