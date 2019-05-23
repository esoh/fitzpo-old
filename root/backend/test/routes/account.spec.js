const chai = require('chai')
const chaiHttp = require('chai-http')

const {Account} = require('../../models')
const server = require('../../app')

const expect = chai.expect

chai.use(chaiHttp)

describe('Accounts API', () => {


    describe('/GET accounts', () => {
        it('should GET all accounts', (done) => {
            chai.request(server)
                .get('/accounts')
                .end((err, res) => {
                    expect(res.body).to.be.a('array')
                    done()
                })
        })
    })

    describe('/POST accounts', () => {
        describe('Singular request tests', () => {

            beforeEach(() => {
                return Account.destroy({ truncate: true })
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
                        expect(res.body.username).to.eql('username')
                        expect(res.body.email).to.eql('email@email.com')
                        expect(res.body).to.not.have.property('password')
                        done()
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

            before(() => {
                return Account.destroy({ truncate: true })
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
                        expect(res.body.username).to.eql('username')
                        expect(res.body.email).to.eql('email@email.com')
                        expect(res.body).to.not.have.property('password')
                        done()
                    })
            })

            it('fail POST with taken username', (done) => {
                chai.request(server)
                    .post('/accounts')
                    .set('Content-Type', 'application/json')
                    .send({
                        username:   'USERNAME',
                        email:      'email2@email.com',
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
