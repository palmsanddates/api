const { body } = require('express-validator');

const User = require('../models/user');
const jwt = require('jsonwebtoken');

function validate(method) {
  switch (method) {
    case 'generateToken':
      return [
        body('email').exists().notEmpty().isString().trim().isEmail(),
        body('password').exists().notEmpty().isString().trim(),
      ];
    default:
      return [];
  }
}

async function generateToken(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Wrong Email or Password' });
    }

    const isMatch = await user.validatePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong Email or Password' });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECRET,
      {
        expiresIn: '1 minute',
      }
    );

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

const authController = {
  validate,
  generateToken,
};

module.exports = authController;
