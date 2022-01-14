const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const checkRole = require('../middlewares/checkRole');

const roleController = require('../controllers/roles');
const { validate, getRoles, createNewRole } = roleController;
const validateRules = require('../middlewares/validators/validateRules');

router.get('/', checkAuth, checkRole(['super_admin']), getRoles);
router.post(
	'/',
	checkAuth,
	checkRole(['super_admin']),
	validate('createNewRole'),
	validateRules,
	createNewRole,
);

module.exports = router;
