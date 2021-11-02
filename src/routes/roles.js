const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const checkRole = require('../middlewares/checkRole');

const roleController = require('../controllers/roles');
const { validate, getRoles, createNewRole } = roleController;
const validateRules = require('../middlewares/validators/validateRules');

router.get('/', checkAuth, checkRole(['super admin']), getRoles);
router.post(
	'/',
	checkAuth,
	checkRole(['super admin']),
	validate('createNewRole'),
	validateRules,
	createNewRole,
);

module.exports = router;
