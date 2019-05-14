const {Account} = require('../models')

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
                res.send(account)
            })
            .catch(err => {
                //handle error thrown by model in controller. Business logic.
                console.log(err)
                res.send(err)

                next(err)
            })
    }
}
