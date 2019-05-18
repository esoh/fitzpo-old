const {Account} = require('../models')
const APIError = require('../utils/errorBuilder').APIError

// TODO: throw same error for if username or email fail unique validation
// TODO: think about defining some global error codes for validation errors

catchSchemaErrors = function(err) {
    let details = []
    let params = []
    var error = null
    switch(err.name){
        case 'ValidationError':
            for (var i in err.errors){
                details.push(err.errors[i].details)
            }
            error = new APIError({
                title: 'Input validation constraints error',
                detail: 'The following messages for the violating fields are outputted below:\n' + details.join('\n')
            })
            return {
                error,
                statusCode: 400
            }
            break
        case 'UniqueConstraintError':
            for (var i in err.errors){
                params.push(err.errors[i].param)
            }
            error = new APIError({
                title: 'Unique constraint error',
                detail: 'The inputs for the following fields must be unique: ' + params.join(", ")
            })
            return {
                error,
                statusCode: 409
            }
            break
        case 'NotNullConstraintError':
            for (var i in err.errors){
                params.push(err.errors[i].param)
            }
            error = new APIError({
                title: 'Not null constraint error',
                detail: 'The inputs for the following fields are required: ' + params.join(", ")
            })
            return {
                error,
                statusCode: 400
            }
            break
        default:
            return null
    }
}

module.exports = {
    list: function(req, res, next){
        // controller calls the method function
        Account.list()
            .then(accounts => {
                // this is where you would generate a view
                res.send(accounts)
            })
            .catch(err => {

                next(err) //pass error to express middleware
            })
    },
    post: function(req, res, next){
        Account.register(req.body.username, req.body.email, req.body.password)
            .then(account => {
                // TODO: Need to decide what to do with password
                // TODO: Set location header that points to new resource
                var accountJson = account.toJSON()
                delete accountJson.password
                res.status(201).json(accountJson)
            })
            .catch(err => {
                //handle error thrown by model in controller. Business logic.
                schemaErr = catchSchemaErrors(err)
                if(schemaErr) return res.status(schemaErr.statusCode).send(schemaErr.error)
                next(err)
            })
    }
}
