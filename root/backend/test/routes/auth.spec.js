const chai = require('chai')
const chaiHttp = require('chai-http')

const {Account} = require('../../models')
const server = require('../../app')

const expect = chai.expect

chai.use(chaiHttp)

describe('Auth API', () => {

    describe('/POST auth/token', () => {

        before(() => {
            return Account.destroy({ truncate: true })
        })

        it('successfully validate existing account', async () => {
            try{
                await Account.register('userName', 'test@email.com', 'Password!123')
            } catch(err) {
                throw err
            }

            chai.request(server)
                .post('/auth/token')
                .set('Content-Type', 'application/json')
                .send({
                    username:   'username',
                    password:   'Password!123'
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body.username).to.eql('userName')
                    expect(res.body.email).to.eql('test@email.com')
                    expect(res.body).to.not.have.property('password')
                    expect(res).to.have.header('Set-Cookie');
                })
        })

        it('fail to validate nonexistent account', (done) => {
            chai.request(server)
                .post('/auth/token')
                .set('Content-Type', 'application/json')
                .send({
                    username:   'username2',
                    password:   'Password!123'
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('error')
                    expect(res.body.error.code).to.eql(1003)
                    expect(res).to.not.have.header('Set-Cookie');
                    done()
                })
        })

        it('fail to validate account with wrong password', (done) => {
            chai.request(server)
                .post('/auth/token')
                .set('Content-Type', 'application/json')
                .send({
                    username:   'username',
                    password:   'password!123'
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('error')
                    expect(res.body.error.code).to.eql(1003)
                    expect(res).to.not.have.header('Set-Cookie');
                    done()
                })
        })

    })

    describe('/DELETE auth/token', () => {

        it('should return empty set-cookie', async () => {
            chai.request(server)
                .delete('/auth/token')
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.header('Set-Cookie');
                    expect(res.header['set-cookie']).to.include('fitzpo_access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT')
                    expect(res).to.have.status(200)
                })
        })
    })

    describe('/GET accounts/me', () => {

        before(() => {
            return Account.destroy({ truncate: true })
        })

        it('successfully return no account without token', (done) => {
            chai.request(server)
                .get('/accounts/me')
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.eql({})
                    done()
                })
        })

        it('successfully register, login, and return account with valid token', (done) => {
            // make a login
            Account.register('userName', 'test@email.com', 'Password!123')
                .then(res => {
                    chai.request(server)
                        .post('/auth/token')
                        .set('Content-Type', 'application/json')
                        .send({
                            username:   'username',
                            password:   'Password!123'
                        })
                        .end((err, res) => {
                            if(err) done(err)

                            chai.request(server)
                                .get('/accounts/me')
                                .set('Cookie', res.headers['set-cookie'])
                                .end((err, res) => {
                                    if(err) done(err)
                                    expect(res).to.have.status(200)
                                    expect(res.body).to.have.property('account')
                                    expect(res.body.account.username).to.eql('userName')
                                    done()
                                })
                        })
                }, err => {
                    done(err)
                })
        })

        it('fail to return account with invalid token', (done) => {
            chai.request(server)
                .get('/accounts/me')
                .set('Cookie', 'fitzpo_access_token=invalid;')
                .end((err, res) => {
                    if(err) done(err)
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('error')
                    expect(res.body.error.code).to.eql(1001)
                    done()
                })
        })
    })
})
