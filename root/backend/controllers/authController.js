const passport = require('passport');

const {InvalidUsernameOrPasswordError} = require('../utils/APIError');

// defines the strategy that calls the Account model functions
const authService = require('../services/auth.service')

function authenticateAccount(req, res, next){
    passport.authenticate('local', (account, error, info) => {
        if(error) {
            return next(error)
        }

        if(!account) {
            return new InvalidUsernameOrPasswordError().sendToRes(res);
        }

        //TODO: check if user verified (2factor with email) to generate token
        let token = authService.generateToken(account)
        // TODO: set expiry date for token and figure out secure https transfer
        res.cookie(authService.ACCESS_TOKEN, token, { httpOnly: true })
        account = account.toJSON()
        delete account.password
        return res.status(201).send(account)
    })(req, res)
}

function deauthenticateAccountLocally(req, res){
    res.clearCookie(authService.ACCESS_TOKEN);
    return res.sendStatus(200)
}

// TODO: deauthenticateAccount should add the token to a blacklist that will eventually be
// cleaned up by the expired token cleaner

module.exports = {
    authenticateAccount,
    deauthenticateAccountLocally,
}
