// defines the strategy that calls the Account model functions
const auth = require('../services/auth.service')

const {
    InvalidUsernameOrPasswordError,
    UserNotFoundError,
    InvalidTokenError,
} = require('../utils/APIError');
const {User} = require('../models');
const {ACCESS_TOKEN} = require('../utils/constants');
const cookieOpts = (process.env.NODE_ENV === 'production') ? {
    httpOnly: true,
    secure: true,
} : {};

function authenticateUser(req, res, next){
    auth.localAuth(req, res)
        .then(account => {
            if(!account) return new InvalidUsernameOrPasswordError().sendToRes(res);

            return User.findByPk(account.userUuid)
                .then(user => {
                    if(!user) return new UserNotFoundError().sendToRes(res);


                    //TODO: check if user verified (2factor with email) to generate token
                    let token = auth.generateToken(user);
                    // TODO: set expiry date for token
                    res.cookie(ACCESS_TOKEN, token, cookieOpts)
                    return res.status(201).send({ user });
                })
        })
        .catch(next);
}

function deleteTokenCookie(req, res){
    res.clearCookie(ACCESS_TOKEN);
    return res.sendStatus(200)
}

// TODO: deauthenticateAccount should add the token to a blacklist that will eventually be
// cleaned up by the expired token cleaner

function getUserFromCookie(req, res, next){
    return auth.jwtAuth(req, res)
        .then(user => {
            if(!user) return new InvalidTokenError().sendToRes(res);
            return res.status(200).send({ user })
        })
        .catch(err => {
            switch(err.name){
                case 'Error':
                    if(err.message == 'No auth token'){
                        return res.status(200).send({})
                    }
                case 'JsonWebTokenError':
                    return new InvalidTokenError().sendToRes(res);
                default:
                    console.log(err);
            }
            return next(err);
        });
}

module.exports = {
    authenticateUser,
    deleteTokenCookie,
    getUserFromCookie,
}
