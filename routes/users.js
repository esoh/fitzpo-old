// We could define router within ./app.js and pass it into
// app.use(/users, router) if we wanted, but instead we are returning the router
// from this file using module.exports

const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
   res.send('REGISTER');
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
   res.send('AUTHENTICATE');
});

// Profile
router.get('/profile', (req, res, next) => {
   res.send('PROFILE');
});

// module.exports is what is returned by this file when require is called on it.
module.exports = router;
