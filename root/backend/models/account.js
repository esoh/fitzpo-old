'use strict'
module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {})
    Account.associate = function(models) {
        // associations can be defined here
    }

    // list accounts
    // limit: up to <limit> accounts shown
    Account.list = function(limit=20) {
        return new Promise((resolve, reject) => {
            Account.findAll({ limit: limit })
                .then(accounts => { resolve(accounts) })
                .catch(err => { reject(err) })
        })
    }
    return Account
}
