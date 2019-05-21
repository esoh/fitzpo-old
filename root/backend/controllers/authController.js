const passport = require('passport')

const APIError = require('../utils/errorBuilder').APIError

// defines the strategy that calls the Account model functions
const authService = require('../services/auth.service')

module.exports = {
    authenticateAccount: function(req, res, next){
        let promise = new Promise((resolve, reject) => {
            passport.authenticate('local', (account, error, info) => {
                if(error) {
                    return reject(error)
                }
                if(!account) {
                    error = new APIError({
                        title: 'Invalid credentials',
                        detail: 'Username and/or password are incorrect.'
                    })
                    return reject(error)
                }

                //TODO: check if user verified (2factor with email) to generate token
                let token = authService.generateToken(account)
                return resolve({
                    account: account,
                    token: token,
                })
            })(req, res)
        })
            .then(result => {
                account = result.account.toJSON()
                delete account.password
                // cookie name: fitzpo_access_token
                // TODO: set expiry date for token and figure out secure https transfer
                res.cookie('fitzpo_access_token', result.token, { httpOnly: true })
                res.status(201).json(account)
            })
            .catch(error => {
                res.status(400).send(error)
            })
    }
}
