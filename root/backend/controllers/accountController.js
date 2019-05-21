const {Account} = require('../models');
const { UsernameOrEmailNotUniqueError,
        InvalidTokenError,
        AccountNotFoundError,
        InvalidParametersError } = require('../utils/APIError');
const authService = require('../services/auth.service');
const convertSchemaError = require('../services/errorHandler.service').convertSchemaError;
const {UNIQUE_ERROR} = require('../utils/SchemaError');

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
        .catch(err => {
            let schemaErr = convertSchemaError(err);
            if(!schemaErr) return next(err);

            if(schemaErr instanceof InvalidParametersError &&
               err.errors.some(paramErr =>
                    (paramErr.param == 'username' || paramErr.param == 'email')
                    && paramErr.error == UNIQUE_ERROR
               ))
            {
               return new UsernameOrEmailNotUniqueError().sendToRes(res);
            }

            return next(err);
        })
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
        return new InvalidTokenError().sendToRes(res);
    }

    Account.findByUsername(payload.username)
        .then(account => {
            if(!account) {
                return new AccountNotFoundError().sendToRes(res);
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
