const { check, validationResult } = require('express-validator');

exports.validateUser = [
  check('userName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Username is missing!')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be 3 to 20 characters long!'),
  check('email').normalizeEmail().isEmail().withMessage('Email is invalid!'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is missing!')
    .isStrongPassword()
    .withMessage(
      'Passwords MUST contain a minimum length of 8 characters and all four character types: Uppercase letters: A-Z. Lowercase letters: a-z. Numbers: 0-9. Symbols: ~`!@#$%^&*()_-+={[}]|:;"\'<,>.?/'
    ),
  check('confirmPassword')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Confirm Password is missing!')
    .isStrongPassword()
    .withMessage(
      'Password MUST contain a minimum length of 8 characters and all four character types: Uppercase letters: A-Z. Lowercase letters: a-z. Numbers: 0-9. Symbols: ~`!@#$%^&*()_-+={[}]|:;"\'<,>.?/'
    )
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();

  res.status(400).json({ error: error[0].msg });
};
