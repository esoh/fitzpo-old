const chai = require('chai')
const chaiHttp = require('chai-http')

const {Account, User} = require('../../models')
const server = require('../../app')

const expect = chai.expect

chai.use(chaiHttp)

describe('Auth API', () => {

    describe('/POST auth/token', () => {

        before(async () => {
            await User.destroy({ truncate: { cascade: true } })
            await Account.destroy({ truncate: { cascade: true } })
        })

        it('successfully validate existing account', async () => {
            await chai.request(server)
                .post('/accounts')
                .set('Content-Type', 'application/json')
                .send({
                    username:   'userName',
                    email:      'test@email.com',
                    password:   'Password!123',
                })

            return chai.request(server)
                .post('/auth/token')
                .set('Content-Type', 'application/json')
                .send({
                    username:   'username',
                    password:   'Password!123'
                })
                .then(res => {
                    expect(res).to.have.status(201)
                    expect(res.body.user.username).to.eql('userName')
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

    describe('/DELETE auth/cookie', () => {

        it('should return empty set-cookie', async () => {
            chai.request(server)
                .delete('/auth/cookie')
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.header('Set-Cookie');
                    expect(res.header['set-cookie']).to.include('fitzpo_access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT')
                    expect(res).to.have.status(200)
                })
        })
    })

    describe('/GET auth/me', () => {

        beforeEach(async () => {
            await Account.destroy({ truncate: { cascade: true } })
            await User.destroy({ truncate: { cascade: true } })
        })

        it('successfully return no account without token', () => {
            return chai.request(server)
                .get('/auth/me')
                .then(res => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.eql({})
                })
        })

        it('successfully register, login, and return account with valid token', () => {

            return chai.request(server)
                .post ('/accounts')
                .set('Content-Type', 'application/json')
                .send({
                    username:   'userName',
                    email:      'test@email.com',
                    password:   'Password!123',
                })
                .then(() => {
                    return chai.request(server)
                        .post('/auth/token')
                        .set('Content-Type', 'application/json')
                        .send({
                            username:   'username',
                            password:   'Password!123'
                        })
                })
                .then(res => {
                    return chai.request(server)
                        .get('/auth/me')
                        .set('Cookie', res.headers['set-cookie'])
                        .then(res => {
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.property('user')
                            expect(res.body.user.username).to.eql('userName')
                        })
                })
        })

        it('successfully register, login, fail to get account with expired cookie', () => {
            return chai.request(server)
                .post ('/accounts')
                .set('Content-Type', 'application/json')
                .send({
                    username:   'userName2',
                    email:      'test2@email.com',
                    password:   'Password!123',
                })
                .then(() => {
                    return chai.request(server)
                        .post('/auth/token')
                        .set('Content-Type', 'application/json')
                        .send({
                            username:   'username2',
                            password:   'Password!123'
                        })
                })
                .then(res => {
                    var cookie = res.headers['set-cookie'][0];
                    if(cookie.indexOf('; Expires') != -1){
                        cookie = cookie.slice(0, cookie.indexOf('; Expires'))
                    }
                    cookie +=  '; Expires=Thu, 01 Jan 1970 00:00:00 GMT'

                    return chai.request(server)
                        .get('/auth/me')
                        .set('Cookie', [cookie])
                        .then(res => {
                            expect(res).to.have.status(200);
                            expect(res.body).to.eql({});
                        })
                })
        })

        it('fail to return account with invalid token', () => {
            return chai.request(server)
                .get('/auth/me')
                .set('Cookie', 'fitzpo_access_token=invalid;')
                .then(res => {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('error')
                    expect(res).to.have.header('Set-Cookie');
                    expect(res.header['set-cookie']).to.include('fitzpo_access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT')
                    expect(res.body.error.code).to.eql(1001)
                })
        })

        it('successfully register, login, delete account, and fail to return account with valid token', () => {

            //register
            return chai.request(server)
                .post ('/accounts')
                .set('Content-Type', 'application/json')
                .send({
                    username:   'userName',
                    email:      'test@email.com',
                    password:   'Password!123',
                })
                .then(() => {
                    //login
                    return chai.request(server)
                        .post('/auth/token')
                        .set('Content-Type', 'application/json')
                        .send({
                            username:   'username',
                            password:   'Password!123'
                        })
                })
                .then((res) => {
                    //delete stuff
                    return User.destroy({ truncate: {cascade: true}})
                        .then(() => Account.destroy({ truncate: {cascade: true}}))
                        .then(() => {
                            // try to use access token to get profile
                            return chai.request(server)
                                .get('/auth/me')
                                .set('Cookie', res.headers['set-cookie'])
                                .then(res => {
                                    expect(res).to.have.status(400)
                                    expect(res.body).to.have.property('error')
                                    expect(res).to.have.header('Set-Cookie');
                                    expect(res.header['set-cookie']).to.include('fitzpo_access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT')
                                    expect(res.body.error.code).to.eql(1001)
                                })
                        })
                })
        })
    })
})
