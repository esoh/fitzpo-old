const passport = require('passport');

const {
    InvalidUsernameOrPasswordError,
    UserNotFoundError,
} = require('../utils/APIError');
const {User} = require('../models');

// defines the strategy that calls the Account model functions
const authService = require('../services/auth.service')

function authenticateUser(req, res, next){
    passport.authenticate('local', (error, account, info) => {
        if(error) {
            return next(error)
        }

        if(!account) {
            return new InvalidUsernameOrPasswordError().sendToRes(res);
        }

        User.findByPk(account.userUuid)
            .then(user => {
                if(!user) {
                    return new UserNotFoundError().sendToRes(res);
                }

                //TODO: check if user verified (2factor with email) to generate token
                let token = authService.generateToken(user);
                // TODO: set expiry date for token and figure out secure https transfer
                res.cookie(authService.ACCESS_TOKEN, token, { httpOnly: true })
                return res.status(201).send({ user });

            })
            .catch(err => next(err));
    })(req, res)
}

function deleteTokenCookie(req, res){
    res.clearCookie(authService.ACCESS_TOKEN);
    return res.sendStatus(200)
}

// TODO: deauthenticateAccount should add the token to a blacklist that will eventually be
// cleaned up by the expired token cleaner

module.exports = {
    authenticateUser,
    deleteTokenCookie,
}
