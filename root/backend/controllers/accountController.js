const {
    Account,
    User
} = require('../models');
const SchemaError = require('../utils/SchemaError');

function registerAccount(req, res, next){
    Account.register(req.body.username, req.body.email, req.body.password)
        .then(account => {
            // TODO: if user found and no associated account found, create the
            // account only and connect it to the user
            return User.addUser(req.body.username)
                .then(user => {
                    account.setUser(user)
                        .then(() => {
                            res.status(201).send({ user });
                        })
                })
        })
        .catch(err => {
            // hides if email is taken or not
            if(err instanceof SchemaError) err.combineUsernameEmailNotUnique();

            return next(err);
        })
}

module.exports = {
    registerAccount,
}
