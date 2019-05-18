'use strict';
const chai = require('chai')
const expect = chai.expect
const app = require('../../models')

describe('models/account', () => {
    before(() => {
        return app.sequelize.sync()
    })

    describe('#create()', () => {

        beforeEach(() => {
            this.Account = require('../../models').Account
            return this.Account.destroy({ truncate: true })
        })

        it('successfully creates an account', () => {
            return this.Account.post('username-test', 'test@email.com', 'Password!123')
                .then((account) => {
                    expect(account.username).to.equal('username-test')
                    expect(account.email).to.equal('test@email.com')
                    expect(account.password).to.not.equal('Password!123')
                }, (err) => {
                    throw err
                })
        })

        it('fails to create an account with a profane username', () => {
            return this.Account.post('fuck9!', 'test@email.com', 'Password!123')
                .then(account => {
                    throw new Error('was not supposed to succeed')
                }, err => {
                    expect(err.name).to.equal('ValidationError')
                })
        })

        it('fails to create an account with a username with an illegal char', () => {
            return this.Account.post('username(', 'test@email.com', 'Password!123')
                .then(account => {
                    throw new Error('was not supposed to succeed')
                }, err => {
                    expect(err.name).to.equal('ValidationError')
                })
        })

        it('fails to create an account with an invalid email', () => {
            return this.Account.post('username', 'test', 'Password!123')
                .then(account => {
                    throw new Error('was not supposed to succeed')
                }, err => {
                    expect(err.name).to.equal('ValidationError')
                })
        })

        it('fails to create an account with an invalid email', () => {
            return this.Account.post('username', 'test@email', 'Password!123')
                .then(account => {
                    throw new Error('was not supposed to succeed')
                }, err => {
                    expect(err.name).to.equal('ValidationError')
                })
        })

        it('fails to create an account with a password not containing a special character', () => {
            return this.Account.post('username', 'test@email.com', 'Password99')
                .then(account => {
                    throw new Error('was not supposed to succeed')
                }, err => {
                    expect(err.name).to.equal('ValidationError')
                })
        })

        it('fails to create an account with a password not containing a number', () => {
            return this.Account.post('username', 'test@email.com', 'Password$$$')
                .then(account => {
                    throw new Error('was not supposed to succeed')
                }, err => {
                    expect(err.name).to.equal('ValidationError')
                })
        })

        it('fails to create an account with a password not containing a letter', () => {
            return this.Account.post('username', 'test@email.com', '$$$$$$$$99')
                .then(account => {
                    throw new Error('was not supposed to succeed')
                }, err => {
                    expect(err.name).to.equal('ValidationError')
                })
        })

        it('fails to create an account with a duplicate username', async () => {
            try {
                await this.Account.post('userName', 'test@email.com', 'Password!123')
            } catch(err) {
                throw err
            }

            return this.Account.post('username', 'test2@email.com', 'Password!123')
                .then(account => {
                    throw new Error('Create was not supposed to succeed')
                }, err => {
                    expect(err.name).to.equal('UniqueConstraintError')
                })
        })

        it('fails to create an account with a duplicate email', async () => {
            try{
                await this.Account.post('userName', 'test@email.com', 'Password!123')
            } catch(err) {
                throw err
            }

            return this.Account.post('username2', 'tesT@email.com', 'Password!123')
                .then(account => {
                    throw new Error('Create was not supposed to succeed')
                }, err => {
                    expect(err.name).to.equal('UniqueConstraintError')
                })
        })

    })

    describe('#findByUsername()', () => {

        before(() => {
            return this.Account.destroy({ truncate: true })
        })

        it('succeeds in finding a user by username', async () => {
            try{
                await this.Account.post('userName', 'test@email.com', 'Password!123')
            } catch(err) {
                throw err
            }

            return this.Account.findByUsername('Username')
                .then(account => {
                    expect(account.username).to.eql('userName')
                    expect(account.password).to.not.be.ok
                }, err => {
                    throw err
                })
        })

        it('fails to find a non-existent user', () => {
            return this.Account.findByUsername('Username2')
                .then(account => {
                    expect(account).to.not.be.ok
                }, err => {
                    throw err
                })
        })
    })
})
