const model = require('../models')

module.exports = {
    list: function(req, res){
        model.Account.findAll()
            .then(accounts => {
                // this is where you would generate a view
                res.send(accounts)
            })
    },
}
