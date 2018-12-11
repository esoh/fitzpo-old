const express = require('express');
const router = express.Router();

// Login
/* router.post('/', (req, res, next) => {


   if(!req.body.usernameOrEmail){
      return res.status(400).json({errors: {usernameOrEmail: "required" }});
   }

   if(!req.body.password){
      return res.status


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
            return res.json({success: false, msg: 'Wrong password'});
         }
      });
   });
}); */
