const Role = require('../models/role');
const { body } = require('express-validator');

function validate(method) {
  switch(method) {
    case 'createNewRole':
      return [body('name').exists().notEmpty().isString().trim()];
    default:
      return [];
  }
}

async function createNewRole(req, res, next) {
  try {
    const { name } = req.body;
    const newRole = new Role({ name });
    const createdRole = await newRole.save();

    return res.status(201).json({ id: createdRole._id });
  } catch (error) {
    next(error);
  }
}

const roleController = {
  validate,
  createNewRole,
};

module.exports = roleController;
