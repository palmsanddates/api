const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.js');
const { validate, generateToken, signup } = authController;
const validateRules = require('../middlewares/validators/validateRules');

router.put('/signup', validate('signupRules'), validateRules, signup);
router.post('/login', validate('generateToken'), validateRules, generateToken);

module.exports = router;
