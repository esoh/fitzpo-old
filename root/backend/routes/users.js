// We could define router within ./app.js and pass it into
// app.use(/users, router) if we wanted, but instead we are returning the router
// from this file using module.exports
// https://dev.to/medaymentn/securing-your-node-js-api-with-json-web-token-5o5
/*
Client        RESTful API      JWT Issuer
    |              |                |
    |----- 1. ---->|                |
    |              |------ 2. ----->|-----
    |              |                | 3. |
    |              |<----- 4. ------|<----
-----|<---- 5. -----|                |
| 6. |              |                |
---->|----- 7. ---->|                |
    |              |------ 8. ----->|-----
    |              |                | 9. |
    |              |<----- 10. -----|<----
    |              |                |
    |              |------          |
    |              | 11. |          |
    |<---- 12. ----|<-----          |
    |              |                |
    .              .                .

1. Ask RESTful API for a JWT using login endpoint.
2. Ask Issuer to create a new JWT.
3. Create JWT.
4. Return JWT to the RESTful API.
5. Return JWT to Client.
6. Store JWT to append it to all future API requests.
7. Ask for data from API providing JWT as authorization.
8. Send JWT to Issuer for verification.
9. Issuer verifies JWT.
10. Issuer returns 200 OK, verification successful.
11. Retrieve and format data for Client.
12. Return data to Client.
*/

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

const pwRegEx = new RegExp("^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[!@#$%^&*?])(?=.{8,})");

// Register a user
router.post('/', (req, res, next) => {

    // test if password follows requirements
    if (!pwRegEx.test(req.body.password)) {
        return res.status(422).send({
            error: {
                message: "Password does not meet requirements",
                errorType: "ValidationError",
                error: ""
            }
        })
    }

    let newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    // call registerUser which will hash password and attempt to store to db
    User.registerUser(newUser, (err, user) => {
        //Error handler
        if(err){
            // handle validation error
            if (err.name === 'ValidationError') {
                return res.status(422).send({
                    error: {
                        message: "Input not valid",
                        errorType: "ValidationError",
                        error: err
                    }
                })
            }

            // pass all other errors to error handling middleware
            return next(err)

        // successful post
        } else {
            return res.status(201).send({
                username: user.username,
            })
        }
    })
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
            const payload = { username : user.username };
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
            res.json({success: false, msg: 'Wrong password'});
         }
      });
   });
});

// Profile
// protect route with authentication token
/* router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
   res.json({user: req.user});
}); */

// Get another user
router.get('/:username', (req, res, next) => {
   passport.authenticate('jwt', (err, user, info) => {
      // throw errors first
      if(err) { return next(err); }

      // fetch target user info
      const targetUsername = req.params.username;
      User.getUserByUsernameOrEmail(targetUsername, (err, targetUser) => {
         if(err) { return next(err); }

         if(!targetUser){
            return res.json({success: false, msg: 'User not found'});
         }

         if(info && info.message !== 'No auth token') {
            return res.json({success: false, msg: info.message});
         }

         // put public-viewable info in
         var data = {
            username: targetUser.username
         };

         // put registered user viewable info in
         if(user){
            data.email = targetUser.email;
         }

         return res.json(data);
      });
   })(req, res, next);
});

// Check if email exists
router.get('/emails/:email', (req, res, next) => {
   User.emailExists(req.params.email, (err, foundUser) => {
      if(err) { return next(err); }

      if(!foundUser){
         return res.json({})
      }

      return res.json({ email: foundUser.email })
   });
});

// module.exports is what is returned by this file when require is called on it.
module.exports = router;
