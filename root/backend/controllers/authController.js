const passport = require('passport');

const {InvalidUsernameOrPasswordError} = require('../utils/APIError');

// defines the strategy that calls the Account model functions
const authService = require('../services/auth.service')

module.exports = {
    authenticateAccount: function(req, res, next){
        passport.authenticate('local', (account, error, info) => {
            if(error) {
                return next(error)
            }

            if(!account) {
                return new InvalidUsernameOrPasswordError().sendToRes(res);
            }

            //TODO: check if user verified (2factor with email) to generate token
            let token = authService.generateToken(account)
            // cookie name: fitzpo_access_token
            // TODO: set expiry date for token and figure out secure https transfer
            res.cookie('fitzpo_access_token', token, { httpOnly: true })
            account = account.toJSON()
            delete account.password
            return res.status(201).send(account)
        })(req, res)
    }
}
