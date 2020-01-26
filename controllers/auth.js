const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('5e28be82532a6c8d06f5e534').then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(err => {
      if (err) {
        console.log(err);
      }
      res.redirect('/');
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
