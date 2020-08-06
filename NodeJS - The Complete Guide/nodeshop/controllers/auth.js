const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
const { validationResult } = require('express-validator');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const User = require('../models/user');

const ONE_HOUR = 3600000;

exports.getLogin = (req, res, next) => {
  const errors = req.flash('error');
  let message;
  if (errors.length > 0) {
    [message] = errors;
  }
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    errorMessage: message,
    oldInput: {
      email: '',
      password: '',
    },
    validationErrors: [],
  });
};

exports.getSignup = (req, res, next) => {
  const errors = req.flash('error');
  let message;
  if (errors.length > 0) {
    [message] = errors;
  }
  res.render('auth/signup', {
    pageTitle: 'Signup',
    path: '/signup',
    errorMessage: message,
    oldInput: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationErrors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      pageTitle: 'Login',
      path: '/login',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email,
        password,
        confirmPassword: req.body.confirmPassword,
      },
      validationErrors: {
        email: errors.array().find(e => e.param === 'email') ? 'invalid' : '',
        password: errors.array().find(e => e.param === 'password')
          ? 'invalid'
          : '',
      },
    });
  }
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(422).render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        errorMessage: 'Invalid email or password.',
        oldInput: {
          email,
          password,
          confirmPassword: req.body.confirmPassword,
        },
        validationErrors: {
          email: errors.array().find(e => e.param === 'email') ? 'invalid' : '',
          password: errors.array().find(e => e.param === 'password')
            ? 'invalid'
            : '',
        },
      });
    }
    bcrypt
      .compare(password, user.password)
      .then(matchingPassword => {
        if (matchingPassword) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            if (err) {
              console.log(err);
            }
            res.redirect('/');
          });
        }
        return res.status(422).render('auth/login', {
          pageTitle: 'Login',
          path: '/login',
          errorMessage: 'Invalid email or password.',
          oldInput: {
            email,
            password,
            confirmPassword: req.body.confirmPassword,
          },
          validationErrors: {
            email: errors.array().find(e => e.param === 'email')
              ? 'invalid'
              : '',
            password: errors.array().find(e => e.param === 'password')
              ? 'invalid'
              : '',
          },
        });
      })
      .catch(err => {
        console.log(err);
        res.redirect('/login');
      });
  });
};

exports.postSignup = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      pageTitle: 'Signup',
      path: '/signup',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email,
        password,
        confirmPassword: req.body.confirmPassword,
      },
      validationErrors: {
        email: errors.array().find(e => e.param === 'email') ? 'invalid' : '',
        password: errors.array().find(e => e.param === 'password')
          ? 'invalid'
          : '',
        confirmPassword: errors.array().find(e => e.param === 'confirmPassword')
          ? 'invalid'
          : '',
      },
    });
  }
  bcrypt
    .hash(password, 16)
    .then(hashedPassword => {
      const user = new User({
        email,
        password: hashedPassword,
        cart: { items: [] },
      });
      return user.save();
    })
    .then(() => {
      res.redirect('/login');
      return sgMail
        .send({
          to: email,
          from: 'shop@nodeshop.com',
          subject: 'NodeShop Account Created!',
          text: 'You are awesome!',
          html: '<h1>You successfully signed up!</h1>',
        })
        .catch(err => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
  const errors = req.flash('error');
  let message;
  if (errors.length > 0) {
    [message] = errors;
  }
  res.render('auth/reset-password', {
    pageTitle: 'Reset Password',
    path: '/reset-password',
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      req.flash('error', 'Password Reset Failed.');
      return res.redirect('/reset-password');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('error', 'No account found with email.');
          return res.redirect('/reset-password');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + ONE_HOUR;
        return user.save();
      })
      .then(() => {
        res.redirect('/');
        sgMail.send({
          to: req.body.email,
          from: 'shop@nodeshop.com',
          subject: 'Password Reset',
          html: `
            <p>Password reset requested.</p>
            <p>The following password reset link is valid for one hour:</p>
            <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>
          `,
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const { token } = req.params;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then(user => {
      const errors = req.flash('error');
      let message;
      if (errors.length > 0) {
        [message] = errors;
      }
      res.render('auth/new-password', {
        pageTitle: 'Create New Password',
        path: '/new-password',
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postNewPassword = (req, res, next) => {
  const { password: newPassword, userId, passwordToken } = req.body;

  let resetUser;
  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 16);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = null;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(() => {
      res.redirect('/login');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
