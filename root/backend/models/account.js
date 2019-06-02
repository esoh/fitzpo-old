'use strict'
const bcrypt = require('bcrypt')
const Filter = require('bad-words')
const SchemaError = require('../utils/SchemaError')

const filter = new Filter();
const SALT_ROUNDS = 10

module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,// TODO: split into username_display and username_id = lower(username_display)
            validate: {
                is: /^(?=.*[A-Za-z])[A-Za-z0-9d._-]{1,}$/,
                isNotProfane(value) {
                    if(filter.isProfane(value)) {
                        throw new Error('Inappropriate Username')
                    }
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$!.%*#?&]{8,}/
            }
        }
    }, {
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        },
        hooks: {
            beforeCreate: (account) => {
                return new Promise((resolve, reject) => {
                    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
                        if(err) return reject(err)
                        bcrypt.hash(account.password, salt, (err, hash) => {
                            if(err) return reject(err)
                            account.password = hash
                            return resolve()
                        })
                    })
                })
            }
        }
    })
    Account.associate = function(models) {
        // has a UserUUID field
        Account.belongsTo(models.User, {
            as: 'user',
            onDelete: 'CASCADE',
        });
    }

    // list accounts
    // limit: up to <limit> accounts shown
    Account.list = function(limit=20) {
        return Account.findAll({ limit: limit })
    }

    Account.register = function(username, email, password, userUuid) {
        return new Promise((resolve, reject) => {
            Account.create({
                username,
                email,
                password,
                userUuid,
            })
                .then(account => {
                    return resolve(account)
                })
                .catch(err => {
                    var schemaErr = new SchemaError(err);
                    if(schemaErr) return reject(schemaErr);
                    return reject(err);
                })
        })
    }

    Account.authenticate = function(username, password) {
        // find account with matching username (with password hash)
        return new Promise((resolve, reject) => {
            Account.unscoped().findOne({ where: { username: username } })
                .then(account => {
                    if(!account) return resolve(null) // return same response whether username not found or password not match to prevent exposing whether account exists
                    account.comparePassword(password)
                        .then(match => {
                            if(match) {
                                return resolve(account)
                            } else {
                                return resolve(null)
                            }
                        })
                })
                .catch(err => {
                    var schemaErr = new SchemaError(err);
                    if(schemaErr) return reject(schemaErr);
                    return reject(err);
                })
        })
    }

    Account.findByUsername = function(username) {
        return Account.findOne({ where: {username: username} })
    }

    Account.prototype.comparePassword = function(password) {
        return bcrypt.compare(password, this.password)
    }

    return Account
}
