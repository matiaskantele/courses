const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.'),
    body('password')
      .isLength({ min: 4 })
      .withMessage('Password must be at least 4 characters long.'),
  ],
  authController.postLogin
);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) =>
        // if (value.split('@') === 'test@test.com') {
        //   throw new Error('This email address is forbidden.');
        // }
        // return true;
        User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(new Error('Email already in use.'));
          }
        })
      ),
    body(
      'password',
      'The password must be at least 4 characters long.'
    ).isLength({ min: 4 }),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset-password', authController.getReset);

router.post('/reset-password', authController.postReset);

router.get('/reset-password/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
