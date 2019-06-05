const chai = require('chai')
const chaiHttp = require('chai-http')

const {
    Account,
    User
} = require('../../models')
const server = require('../../app')

const expect = chai.expect

chai.use(chaiHttp)

describe('Accounts API', () => {

    describe('/POST accounts', () => {

        describe('Singular request tests', () => {

            beforeEach(() => {
                return Account.destroy({ truncate: {cascade: true}})
            })

            it('successfully POST valid account', (done) => {
                chai.request(server)
                    .post('/accounts')
                    .set('Content-Type', 'application/json')
                    .send({
                        username:   'username',
                        email:      'email@email.com',
                        password:   'Password!123'
                    })
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.have.property('user');
                        expect(res.body.user.username).to.eql('username');
                        done();
                    })
            })

            it('fail to POST account with empty body', (done) => {
                chai.request(server)
                    .post('/accounts')
                    .set('Content-Type', 'application/json')
                    .send({
                        // empty body
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('error')
                        expect(res.body.error.title).to.eql('Input validation constraints error')
                        expect(res.body.error.code).to.eql(1004)

                        var targetMembers = [{name: 'username', error: 'NotNullValidatorError'},
                                             {name: 'email', error: 'NotNullValidatorError'},
                                             {name: 'password', error: 'NotNullValidatorError'}]
                        var sourceMembers = res.body.error.invalid_params.map(param => { return { name: param.name, error: param.error } });
                        expect(sourceMembers).to.have.deep.members(targetMembers);
                        done()
                    })
            })

            it('fail to POST account with no username', (done) => {
                chai.request(server)
                    .post('/accounts')
                    .set('Content-Type', 'application/json')
                    .send({
                        email:      'email@email.com',
                        password:   'Password!123'
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('error')
                        expect(res.body.error.title).to.eql('Input validation constraints error')
                        expect(res.body.error.code).to.eql(1004)

                        var targetMembers = {name: 'username', error: 'NotNullValidatorError'}
                        var sourceMembers = res.body.error.invalid_params.map(param => { return { name: param.name, error: param.error } });
                        expect(sourceMembers).to.deep.include(targetMembers);
                        done()
                    })
            })

            it('fail to POST account with no email', (done) => {
                chai.request(server)
                    .post('/accounts')
                    .set('Content-Type', 'application/json')
                    .send({
                        username:   'username',
                        password:   'Password!123'
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('error')
                        expect(res.body.error.title).to.eql('Input validation constraints error')
                        expect(res.body.error.code).to.eql(1004)

                        var targetMembers = {name: 'email', error: 'NotNullValidatorError'}
                        var sourceMembers = res.body.error.invalid_params.map(param => { return { name: param.name, error: param.error } });
                        expect(sourceMembers).to.deep.include(targetMembers);
                        done()
                    })
            })

            it('fail to POST account with no password', (done) => {
                chai.request(server)
                    .post('/accounts')
                    .set('Content-Type', 'application/json')
                    .send({
                        username:   'username',
                        email:      'email@email.com',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('error')
                        expect(res.body.error.title).to.eql('Input validation constraints error')
                        expect(res.body.error.code).to.eql(1004)

                        var targetMembers = {name: 'password', error: 'NotNullValidatorError'}
                        var sourceMembers = res.body.error.invalid_params.map(param => { return { name: param.name, error: param.error } });
                        expect(sourceMembers).to.deep.include(targetMembers);
                        done()
                    })
            })

            it('fail to POST account with invalid password', (done) => {
                chai.request(server)
                    .post('/accounts')
                    .set('Content-Type', 'application/json')
                    .send({
                        username:   'username',
                        email:      'email@email.com',
                        password:   'pass'
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('error')
                        expect(res.body.error.title).to.eql('Input validation constraints error')
                        expect(res.body.error.code).to.eql(1004)
                        done()
                    })
            })

            it('fail to POST account with profane username', (done) => {
                chai.request(server)
                    .post('/accounts')
                    .set('Content-Type', 'application/json')
                    .send({
                        username:   'bitch',
                        email:      'email@email.com',
                        password:   'Password!123'
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('error')
                        expect(res.body.error.title).to.eql('Input validation constraints error')
                        expect(res.body.error.code).to.eql(1004)
                        done()
                    })
            })
        })

        describe('Tests with persistent database', () => {

            before(async () => {
                await Account.destroy({ truncate: {cascade: true}})
                await User.destroy({ truncate: {cascade: true}})
            })

            it('successfully POST valid account', () => {
                var userUuid;
                return chai.request(server)
                    .post('/accounts')
                    .set('Content-Type', 'application/json')
                    .send({
                        username:   'username',
                        email:      'email@email.com',
                        password:   'Password!123'
                    })
                    .then(res => {
                        expect(res).to.have.status(201)
                        expect(res.body).to.have.property('user')
                        expect(res.body.user.username).to.eql('username')
                        userUuid = res.body.user.uuid;
                        return Account.findByUsername('username')
                    })
                    .then(account => {
                        expect(account.userUuid).to.eql(userUuid);
                    })
            })

            it('successfully deletes account when user is deleted', () => {
                return Account.findByUsername('username')
                    .then(user => {
                        expect(user).to.be.ok;
                        return User.destroy({ where: { username: 'username' } })
                    })
                    .then(() => Account.findByUsername('username'))
                    .then(account => {
                        expect(account).to.not.be.ok;
                    })
            })

            it('fail POST with taken username', async () => {
                await chai.request(server)
                    .post('/accounts')
                    .set('Content-Type', 'application/json')
                    .send({
                        username:   'username',
                        email:      'email@email.com',
                        password:   'Password!123'
                    })

                await chai.request(server)
                    .post('/accounts')
                    .set('Content-Type', 'application/json')
                    .send({
                        username:   'USERNAME',
                        email:      'email2@email.com',
                        password:   'Password!123'
                    })
                    .then(res => {
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('error')
                        expect(res.body.error.title).to.eql('Input validation constraints error')
                        expect(res.body.error.code).to.eql(1004)

                        var targetMembers = {name: 'usernameOrEmail', error: 'UniqueValidatorError'}
                        var sourceMembers = res.body.error.invalid_params.map(param => { return { name: param.name, error: param.error } });
                        expect(sourceMembers).to.deep.include(targetMembers);
                    })
            })

            it('fail POST with taken email', (done) => {
                chai.request(server)
                    .post('/accounts')
                    .set('Content-Type', 'application/json')
                    .send({
                        username:   'username2',
                        email:      'EmaIl@email.com',
                        password:   'Password!123'
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('error')
                        expect(res.body.error.title).to.eql('Input validation constraints error')
                        expect(res.body.error.code).to.eql(1004)

                        var targetMembers = {name: 'usernameOrEmail', error: 'UniqueValidatorError'}
                        var sourceMembers = res.body.error.invalid_params.map(param => { return { name: param.name, error: param.error } });
                        expect(sourceMembers).to.deep.include(targetMembers);
                        done()
                    })
            })
        })
    })
})
