const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.js');
const { validate, generateToken } = authController;
const validateRules = require('../middlewares/validators/validateRules')

router.post('/login', validate('generateToken'), validateRules, generateToken);

module.exports = router;
