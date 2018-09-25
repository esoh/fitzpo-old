// We could define router within ./app.js and pass it into
// app.use(/users, router) if we wanted, but instead we are returning the router
// from this file using module.exports

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
   let newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
   });

   User.addUser(newUser, (err, user) => {
      if(err){
         res.json({success: false, msg: 'Failed to register user'});
      } else {
         res.json({success: true, msg: 'User registered'});
      }
   });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
   const usernameOrEmail = req.body.usernameOrEmail;
   const password = req.body.password;

   User.getUserByUsernameOrEmail(usernameOrEmail, (err, user) => {
      if(err) throw err;

      if(!user){
         return res.json({success: false, msg: 'User not found'});
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
         if(err) throw err;
         if(isMatch){
            // we don't want the payload to contain any sensitive information.
            const payload = { _id : user._id };
            const token = jwt.sign(payload, config.secret, {
               expiresIn: 604800 // 1 week
            });

            res.json({
               success: true,
               token: `Bearer ${token}`,
               user: {
                  id: user._id,
                  username: user.username,
                  email: user.email
               }
            });
         } else {
            return res.json({success: false, msg: 'Wrong password'});
         }
      });
   });
});

// Profile
// protect route with authentication token
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
   res.json({user: req.user});
});

// module.exports is what is returned by this file when require is called on it.
module.exports = router;
