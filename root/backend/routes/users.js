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
const Profile = require('../models/profile');
const Filter = require('bad-words');
const upload = require('../services/s3-file-upload')

const singleUpload = upload.single('image'); // key is 'image'

const pwRegEx = new RegExp("^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[!@#$%^&*?])(?=.{8,})");

filter = new Filter();

// Register a user
router.post('/', (req, res, next) => {

    // test if username is profane
    if (filter.isProfane(req.body.username)) {
        return res.status(422).send({
            error: {
                message: "Inappropriate Username",
                errorType: "UserValidationError",
                error: ""
            }
        })
    }

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

            // handle duplicate
            if (err.code && err.code==11000){
                // extract duplicate key from error message
                let regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i,
                match =  err.message.match(regex),
                duplicateIndex = match[1] || match[2];

                let errorRes = {
                    error: {
                        errorType: "DuplicateKeyError",
                        error: err
                    }
                }

                if(duplicateIndex == 'username'){
                    errorRes.error.message = 'Username is taken'
                } else if(duplicateIndex == 'email'){
                    errorRes.error.message = 'Email is in use'
                } else {
                    errorRes.error.message = 'Unknown duplicate error'
                    return res.status(400).send(errorRes)
                }

                return res.status(409).send(errorRes)
            }

            // pass all other errors to error handling middleware
            return next(err)

        // successful post
        } else {
            let newProfile= new Profile({
                username: user.username,
                img: "",
                firstName: "",
                lastName: "",
                bio: "",
                age: "",
                height: "",
                weight: ""
            });
            newProfile.save();

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

router.get('/profiles/:username', (req, res, next) => {
    Profile.findOne({username: req.params.username}, (err, profile) => {
        if (!profile) {
            return res.json({success: false, msge: 'User not found'})
        } else {
            let data = {
                img: profile.img,
                firstName: profile.firstName,
                lastName: profile.lastName,
                bio: profile.bio,
                age: profile.age,
                height: profile.height,
                weight: profile.weight
            }

            return res.json(data)
        }
    })
})

// update profile info
router.put('/profiles', (req, res, next) => {
    Profile.findOne({username: req.body.username}, (err, profile) => {
        if (!profile) {
            return res.json({success: false, msg: 'User not found'})
        } else {
            profile.firstName = req.body.firstName,
            profile.lastName = req.body.lastName,
            profile.bio = req.body.bio,
            profile.age = req.body.age,
            profile.height = req.body.height,
            profile.weight = req.body.weight
            profile.save(err => {
                if (err) {
                    return res.json({success: false, msg: 'Could not save to db'})
                } else {
                    return res.json({success: true, msg: 'Successfully saved to db'})
                }
            })
        }
    })
})

// upadate profile picture
router.put('/profile-pictures', (req, res) => {
    singleUpload(req, res, function(err) {
        if (err) {
            return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
        }
        Profile.findOne({username: req.body.username}, (err, profile) => {
            if (!profile) {
                return res.json({success: false, msg: 'User not found'})
            } else {
                profile.img = req.file.location
                profile.save(err => {
                    if (err) {
                        return res.json({success: false, msg: 'Could not save to db'})
                    } else {
                        return res.json({success: true, msg: 'Successfully saved to db'})
                    }
                })
            }
        })
        //return res.json({'imageUrl': req.file.location});
    });
});

router.post('/upload', upload.single('image'), function (req, res, next) {
    res.send("Uploaded!");
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
