const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Profile
// protect route with authentication token
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
   res.json({user: req.user});
});

// Get another user
router.get('/:username', passport.authenticate('jwt', {session:false}), (req, res, next) => {
   const username = req.params.username;
   User.getUserByUsernameOrEmail(username, (err, user) => {
      if(err) throw err;

      if(!user){
         return res.json({success: false, msg: 'User not found'});
      }

      res.json({
         success: true,
         user: {
            username: user.username,
            email: user.email
         }
      });
   });

});

module.exports = router;
