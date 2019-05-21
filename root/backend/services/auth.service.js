const passport = require('passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
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

passport.use(new JwtStrategy({
        jwtFromRequest: extractTokenFromCookie,
        secretOrKey:    config.auth_secret,
    },
    function(jwtPayload, done){
        Account.findByUsername(jwtPayload.username)
            .then(account => {
                if(!account) {
                    return done(null, false)
                }
                return done(null, account)
            })
            .catch(err => {
                return done(null, false)
            })
    }
))

function generateToken(account){
    // TODO: maybe put expire date?
    const payload = {
        _id:        account._id,
        username:   account.username,
    }
    return jwt.sign(payload, config.auth_secret)
}

function extractTokenFromCookie(req){
    var token = null
    if(req && req.cookies){
        token = req.cookies['fitzpo_access_token']
    }
    return token
}

module.exports = {
    generateToken,
}
