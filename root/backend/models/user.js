const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const saltRounds = 10;

// User Schema
const UserSchema = mongoose.Schema({
   username: {
      type: String,
      required: true,
      match: /^(?=.*[A-Za-z])[A-Za-z0-9d._-]{1,}$/
   },
   email: {
      type: String,
      unique: true,
      required: true,
      match: /^([a-zA-Z0-9_.-]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/
   },
   password: {
      type: String,
      required: true,
      // validation is done before it's hashed on the backend
   }
});

// set username as case-insensitive unique index
 UserSchema.index({username: 1}, {
     collation: {locale: "en", strength: 2},
     unique: true,
 }, { background: false });

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
   User.findById(id, callback);
}

module.exports.getUserByUsernameOrEmail = function(usernameOrEmail, callback){
   // check if it's an email by checking if it contains the "@"
   const searchCriteria = (usernameOrEmail.indexOf('@') === -1) ?
      { username: usernameOrEmail } : { email: usernameOrEmail };
   User.findOne(searchCriteria, callback).collation({ locale: "en", strength: 2 });
}

// encrypts password before adding user to database.
module.exports.registerUser = function(newUser, callback){
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if(err) return callback(err, null)
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) return callback(err, null)
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
