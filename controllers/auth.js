const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const User = require('../models/user');

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
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) {
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/login');
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
        req.flash('error', 'Invalid email or password.');
        res.redirect('/login');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/login');
      });
  });
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'Email already in use.');
        return res.redirect('/signup');
      }
      return bcrypt.hash(password, 16).then(hashedPassword => {
        const user = new User({
          email,
          password: hashedPassword,
          cart: { items: [] },
        });
        return user.save();
      });
    })
    .then(() => {
      res.redirect('/login');
      return sgMail.send({
        to: email,
        from: 'shop@nodeshop.com',
        subject: 'NodeShop Account Created!',
        text: 'You are awesome!',
        html: '<h1>You successfully signed up!</h1>',
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};
