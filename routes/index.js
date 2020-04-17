const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../lib/auth'); // Use this to ensure that route is protected

// Welcome page
router.get('/', (req, res) => {
  return res.render('welcome');
});

// // Dashboard Page Unprotected
// router.get('/dashboard', (req, res) => {
//   return res.render('dashboard');
// });

// Dashboard Page Protected
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  return res.render('dashboard', {
    userName: req.user.name,
  });
});

module.exports = router;
