const {Account} = require('../models');
const APIError = require('../utils/errorBuilder').APIError;
const authService = require('../services/auth.service');
const convertSchemaError = require('../services/errorHandler.service').convertSchemaError;

// TODO: throw same error for if username or email fail unique validation
// TODO: think about defining some global error codes for validation errors

function listAccounts(req, res, next){
    // controller calls the method function
    Account.list()
        .then(accounts => {
            // this is where you would generate a view
            res.send(accounts)
        })
        .catch(next)
}

function registerAccount(req, res, next){
    Account.register(req.body.username, req.body.email, req.body.password)
        .then(account => {
            // TODO: Need to decide what to do with password
            // TODO: Set location header that points to new resource
            var accountJson = account.toJSON()
            delete accountJson.password
            res.status(201).json(accountJson)
        })
        .catch(next)
}

function getAccountFromCookie(req, res, next){
    const token = authService.extractTokenFromCookie(req);

    if(!token) {
        return res.status(200).send({})
    }

    var payload;
    try {
        payload = authService.decodeToken(token);
    } catch(err) {
        return res.status(400).send(new APIError({
            title: 'Invalid token',
            detail: 'Could not decode token'
        }))
    }

    Account.findByUsername(payload.username)
        .then(account => {
            if(!account) {
                return res.status(400).send(new APIError({
                    title: 'Invalid account',
                    detail: 'Could not find account'
                }))
            }

            return res.status(200).send({ account: account })
        })
        .catch(next)
}

module.exports = {
    listAccounts,
    registerAccount,
    getAccountFromCookie,
}
