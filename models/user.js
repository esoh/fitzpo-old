const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const saltRounds = 10;

// User Schema
const UserSchema = mongoose.Schema({
   name: {
      type: String
   },
   email: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
   User.findById(id, callback);
}

module.exports.getUserByUsernameOrEmail = function(usernameOrEmail, callback){
   // check if it's an email by checking if it contains the "@"
   const searchCriteria = (usernameOrEmail.indexOf('@') === -1) ?
      { username: usernameOrEmail } : { email: usernameOrEmail };
   User.findOne(searchCriteria, callback);
}

module.exports.addUser = function(newUser, callback){
   bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
         if(err) throw err;
         newUser.password = hash;
         newUser.save(callback);
      });
   });
}

module.exports.comparePassword = function(candidateHash, hash, callback){
   bcrypt.compare(candidateHash, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
   });
}
