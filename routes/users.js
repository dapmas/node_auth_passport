const express = require('express');
const router = express.Router();

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
    res.send('pass');
  }
});

module.exports = router;
