const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

// Login page
router.get('/login', (req, res) => {
  return res.render('login');
});

// Register page
router.get('/register', (req, res) => {
  return res.render('register');
});

// Register handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields.' });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match.' });
  }

  // Check passwords length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be atleast 6 chracters.' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errorsPresent: true,
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          // User Exists
          errors.push({ msg: 'Email is already registered.' });
          res.render('register', {
            errorsPresent: true,
            errors,
            name,
            email,
            password,
            password2,
          });
        } else {
          const newUser = new User({
            name,
            email,
            password,
          });

          // Hash password
          bcrypt.genSalt(10, (error, salt) =>
            bcrypt.hash(newUser.password, salt, (error, hash) => {
              if (error) throw error;

              // set password to hashed password
              newUser.password = hash;

              // save User
              newUser
                .save()
                .then((user) => {
                  // add flash message
                  req.flash('success_msg', 'You are now registered');
                  // got the user. redirect to login page
                  res.redirect('/users/login');
                })
                .catch((error) => console.log(error));
            })
          );
        }
      })
      .catch((error) => console.log(error));
  }
});

// Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out.');
  res.redirect('/users/login');
});

module.exports = router;
