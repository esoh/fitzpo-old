const passport = require('passport')
const LocalStrategy = require('passport-local')
const jwt = require('jsonwebtoken')

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.js')[env]

const {Account} = require('../models')

passport.use(new LocalStrategy(
    function(username, password, done) {
        Account.authenticate(username, password)
            .then(account => {
                if(!account) {
                    return done(null, false)
                }
                return done(account)
            })
            .catch(err => { return done(err) })
    }
))

function generateJwt(account){
    // TODO: maybe put expire date?
    const payload = {
        _id:        account._id,
        username:   account.username,
    }
    return jwt.sign(payload, config.auth_secret)
}

module.exports = {
    generateJwt,
}
