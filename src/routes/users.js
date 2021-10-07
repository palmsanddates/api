const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');
const { validate, getUsers, createNewUser, deleteUser } = userController;
const validateRules = require('../middlewares/validators/validateRules');

router.get('/', getUsers);
router.post('/', validate('createNewUser'), validateRules, createNewUser);
router.delete('/:userId', validate('deleteUser'), validateRules, deleteUser)

module.exports = router;
