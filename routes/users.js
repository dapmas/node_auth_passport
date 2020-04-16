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

module.exports = router;
