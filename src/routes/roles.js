const express = require('express');
const router = express.Router();
const checkRole = require('../middlewares/checkRole');

const roleController = require('../controllers/roles');
const { validate, getRoles, createNewRole } = roleController;
const validateRules = require('../middlewares/validators/validateRules');

router.get('/', getRoles);
router.post(
	'/',
	checkRole(['super admin']),
	validate('createNewRole'),
	validateRules,
	createNewRole,
);

module.exports = router;
