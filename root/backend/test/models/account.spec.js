'use strict';
const chai = require('chai')
const expect = chai.expect
const app = require('../../models')

describe('models/account', () => {
    before(() => {
        return app.sequelize.sync()
    })

    beforeEach(() => {
        this.Account = require('../../models').Account
        return this.Account.destroy({ truncate: true })
    })

    after(() => {
        return app.sequelize.close()
    })

    describe('#create()', () => {
        it('successfully creates an account', () => {
            return this.Account.create({
                username:   'username-test',
                email:      'test@email.com',
                password:   'Password!123'
            }).bind(this).then((account) => {
                expect(account.username).to.equal('username-test')
                expect(account.email).to.equal('test@email.com')
                expect(account.password).to.not.equal('Password!123')
            }, (err) => {
                throw err
            })
        })

        it('fails to create an account with a profane username', () => {
            return this.Account.create({
                username:   'fuck9!',
                email:      'test@email.com',
                password:   'Password!123'
            }).bind(this).then(account => {
                throw new Error('was not supposed to succeed')
            }, err => {
                expect(err.name).to.equal('SequelizeValidationError')
            })
        })

        it('fails to create an account with a username with an illegal char', () => {
            return this.Account.create({
                username:   'username(',
                email:      'test@email.com',
                password:   'Password!123'
            }).bind(this).then(account => {
                throw new Error('was not supposed to succeed')
            }, err => {
                expect(err.name).to.equal('SequelizeValidationError')
            })
        })

        it('fails to create an account with an invalid email', () => {
            return this.Account.create({
                username:   'username',
                email:      'test',
                password:   'Password!123'
            }).bind(this).then(account => {
                throw new Error('was not supposed to succeed')
            }, err => {
                expect(err.name).to.equal('SequelizeValidationError')
            })
        })

        it('fails to create an account with an invalid email', () => {
            return this.Account.create({
                username:   'username',
                email:      'test@email',
                password:   'Password!123'
            }).bind(this).then(account => {
                throw new Error('was not supposed to succeed')
            }, err => {
                expect(err.name).to.equal('SequelizeValidationError')
            })
        })

        it('fails to create an account with a password not containing a special character', () => {
            return this.Account.create({
                username:   'username',
                email:      'test@email.com',
                password:   'Password99'
            }).bind(this).then(account => {
                throw new Error('was not supposed to succeed')
            }, err => {
                expect(err.name).to.equal('SequelizeValidationError')
            })
        })

        it('fails to create an account with a password not containing a number', () => {
            return this.Account.create({
                username:   'username',
                email:      'test@email.com',
                password:   'Password$$$'
            }).bind(this).then(account => {
                throw new Error('was not supposed to succeed')
            }, err => {
                expect(err.name).to.equal('SequelizeValidationError')
            })
        })

        it('fails to create an account with a password not containing a letter', () => {
            return this.Account.create({
                username:   'username',
                email:      'test@email.com',
                password:   '$$$$$$$$99'
            }).bind(this).then(account => {
                throw new Error('was not supposed to succeed')
            }, err => {
                expect(err.name).to.equal('SequelizeValidationError')
            })
        })

        // TODO: figure out how to add 2 users then check for duplicate error
        it('fails to create an account with a duplicate username', async () => {
            try {
                await this.Account.create({
                    username:   'userName',
                    email:      'test@email.com',
                    password:   'Password!123'
                }).bind(this)
            } catch(err) {
                throw err
            }

            return this.Account.create({
                username:   'username',
                email:      'test2@email.com',
                password:   'Password!123'
            }).bind(this).then(account => {
                throw new Error('Create was not supposed to succeed')
            }, err => {
                expect(err.name).to.equal('SequelizeUniqueConstraintError')
            })
        })

        it('fails to create an account with a duplicate email', async () => {
            try{
                await this.Account.create({
                    username:   'userName',
                    email:      'test@email.com',
                    password:   'Password!123'
                }).bind(this)
            } catch(err) {
                throw err
            }

            return this.Account.create({
                username:   'username2',
                email:      'tesT@email.com',
                password:   'Password!123'
            }).bind(this).then(account => {
                throw new Error('Create was not supposed to succeed')
            }, err => {
                expect(err.name).to.equal('SequelizeUniqueConstraintError')
            })
        })

    })
})
