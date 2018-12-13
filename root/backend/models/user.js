const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const saltRounds = 10;

// User Schema
const UserSchema = mongoose.Schema({
   email: {
      type: String,
      unique: true,
      required: true,
      match: /^([a-zA-Z0-9_.-]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/
   },
   username: {
      type: String,
      unique: true,
      required: true,
      match: /^(?=.*[A-Za-z])[A-Za-z0-9d._-]{1,}$/
  },
   password: {
      type: String,
      required: true,
      // validation is done before it's hashed on the backend
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

module.exports.emailExists = function(email, callback){
   User.findOne({ email: email }, callback);
}
