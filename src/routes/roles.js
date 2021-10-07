const express = require('express');
const router = express.Router();

const roleController = require('../controllers/roles');
const { validate, createNewRole } = roleController;
const validateRules = require('../middlewares/validators/validateRules');

router.post('/', validate('createNewRole'), validateRules, createNewRole);

module.exports = router;
