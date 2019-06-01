const chai = require('chai');
const expect = chai.expect;
const app = require('../../models');

describe('models/user', () => {
    before(() => {
        return app.sequelize.sync();
    })

    describe('#addUser()', () => {

        beforeEach(async () => {
            this.User = require('../../models').User;
            await this.User.destroy({ truncate: {cascade: true}})
        })

        it('successfully creates a user', (done) => {
            this.User.addUser('tusername')
                .then(() => {

                    this.User.findOne({ where: { username: 'tusername' } })
                        .then(user => {
                            expect(user.username).to.be.ok;
                            expect(user.username).to.equal('tusername');
                            done();
                        })
                        .catch(err => {
                            throw err;
                            done(err);
                        });
                })
                .catch(err => {
                    throw err;
                    done(err);
                });
        });

        it('fails to create a user with a duplicate username', () => {
            return this.User.addUser('tusername')
                .then(() => {
                    this.User.addUser('tusername')
                        .then(() => {
                            throw new Error("wasn't supposed to succeed")
                        }, err => {
                            expect(err.name).to.equal('ValidationError');
                            var errors = err.errors.map(subErr => { return { param: subErr.param, error: subErr.error } })
                            expect(errors).to.deep.include({param: 'username', error: 'UniqueValidatorError'});
                        })
                })
        });

        it('fails to create a user with a profane username', () => {
            return this.User.addUser('fuck')
                .then(account => {
                    throw new Error('was not supposed to succeed')
                }, err => {
                    expect(err.name).to.equal('ValidationError')
                    var errors = err.errors.map(subErr => { return { param: subErr.param, error: subErr.error } })
                    expect(errors).to.deep.include({param: 'username', error: 'ProfanityValidatorError'});
                })
        });

        it('fails to create a user with a username with an illegal char', () => {
            return this.User.addUser('username(')
                .then(() => {
                    throw new Error('was not supposed to succeed')
                }, err => {
                    expect(err.name).to.equal('ValidationError')
                    var errors = err.errors.map(subErr => { return { param: subErr.param, error: subErr.error } })
                    expect(errors).to.deep.include({param: 'username', error: 'CustomValidatorError'});
                })
        })

        it('fails to create an account with a null username', () => {
            return this.User.addUser(null)
                .then(() => {
                    throw new Error('was not supposed to succeed')
                }, err => {
                    expect(err.name).to.equal('ValidationError')
                    var errors = err.errors.map(subErr => { return { param: subErr.param, error: subErr.error } })
                    expect(errors).to.deep.include({param: 'username', error: 'NotNullValidatorError'});
                })
        })

    })
})
