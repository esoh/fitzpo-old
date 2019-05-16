const {Account} = require('../models')
const APIError = require('../utils/errorBuilder').APIError

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
        Account.post(req.body.username, req.body.email, req.body.password)
            .then(account => {
                // TODO: Need to decide what to do with password
                // TODO: Set location header that points to new resource
                res.status(201).send(account)
            })
            .catch(err => {
                //handle error thrown by model in controller. Business logic.
                let details = []
                let params = []
                switch(err.name){
                    case 'ValidationError':
                        for (var i in err.errors){
                            details.push(err.errors[i].details)
                        }
                        res.status(400).send(new APIError({
                            title: 'Input validation constraints error',
                            detail: 'The following messages for the violating fields are outputted below:\n' + details.join('\n')
                        }))
                        break
                    case 'UniqueConstraintError':
                        for (var i in err.errors){
                            params.push(err.errors[i].param)
                        }
                        res.status(409).send(new APIError({
                            title: 'Unique constraint error',
                            detail: 'The inputs for the following fields must be unique: ' + params.join(", ")
                        }))
                        break
                    case 'NotNullConstraintError':
                        for (var i in err.errors){
                            params.push(err.errors[i].param)
                        }
                        res.status(400).send(new APIError({
                            title: 'Not null constraint error',
                            detail: 'The inputs for the following fields are required: ' + params.join(", ")
                        }))
                        break
                    default:
                        next(err)
                }
            })
    }
}
