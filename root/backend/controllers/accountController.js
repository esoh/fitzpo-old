const model = require('../models')

module.exports = {
    list: function(req, res){
        // controller calls the method function
        model.Account.list()
            .then(accounts => {
                // this is where you would generate a view
                res.send(accounts)
            })
    },
    post: function(req, res){
        model.Account.post(req.body.username, req.body.email, req.body.password)
            .then(account => {
               res.send(account)
            })
            .catch(err => {
                //handle error thrown by model in controller. Business logic.
                console.log(err)
                res.send(err)
            })
    }
}
