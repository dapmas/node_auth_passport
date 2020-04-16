const express = require('express');
const router = express.Router();

// Login page
router.get('/login', (req, res) => {
  return res.send('Login');
});

// Register page
router.get('/register', (req, res) => {
  return res.send('Register');
});

module.exports = router;
