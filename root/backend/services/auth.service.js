const passport = require('passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const jwt = require('jsonwebtoken')

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.js')[env]
const {
    Account,
    User,
} = require('../models')
const {
    NoTokenError,
    InvalidTokenError,
} = require('../utils/APIError');

const {ACCESS_TOKEN} = require('../utils/constants');

passport.use(new LocalStrategy(
    function(username, password, done) {
        Account.authenticate(username, password)
            .then(account => {
                if(!account) {
                    return done(null, false)
                }
                return done(null, account)
            })
            .catch(err => { return done(err) })
    }
))

passport.use(new JwtStrategy({
        jwtFromRequest: extractTokenFromCookie,
        secretOrKey:    config.auth_secret,
    },
    function(jwtPayload, done){
        User.findByPk(jwtPayload.id)
            .then(user => {
                if(!user) {
                    return done(null, false)
                }
                return done(null, user)
            })
            .catch(err => {
                return done(err, false)
            })
    }
))

function generateToken(user){
    // TODO: maybe put expire date?
    const payload = {
        id:         user.uuid,
        username:   user.username,
    }
    return jwt.sign(payload, config.auth_secret)
}

function extractTokenFromCookie(req){
    var token = null
    if(req && req.cookies){

        // if expiration date and is past today, return null
        if(req.cookies['Expires']){
            var expirationDate = new Date(req.cookies['Expires'])
            var today = new Date();
            if(today >= expirationDate) return token;
        }

        token = req.cookies[ACCESS_TOKEN]
    }
    return token
}

function authUser(req, res, next){
    return jwtAuth(req, res)
        .then(user => {
            if(!user) return new InvalidTokenError().sendToRes(res);
            return next();
        })
        .catch(err => {
            switch(err.name){
                case 'Error':
                    if(err.message == 'No auth token'){
                        return new NoTokenError().sendToRes(res);
                    }
                case 'JsonWebTokenError':
                    return new InvalidTokenError().sendToRes(res);
                default:
                    console.log(err);
            }
            return next(err);
        })
}

function jwtAuth(req, res){
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', function(err, user, info){
            if(err) reject(err);
            if(info) reject(info);
            req.user = user;
            resolve(user);
        })(req, res);
    });
}

function localAuth(req, res){
    return new Promise((resolve, reject) => {
        passport.authenticate('local', function(err, account, info){
            if(err) reject(err);
            if(info) reject(info);
            resolve(account);
        })(req, res);
    });
}

module.exports = {
    generateToken,
    authUser,
    jwtAuth,
    localAuth,
}
