const chai = require('chai')
const chaiHttp = require('chai-http')

const {Account} = require('../../models')
const server = require('../../app')

const expect = chai.expect

chai.use(chaiHttp)
// TODO: test for token
describe('Auth API', () => {

    describe('/POST auth/token-jwt', () => {

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
                .post('/auth/token-jwt')
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
                .post('/auth/token-jwt')
                .set('Content-Type', 'application/json')
                .send({
                    username:   'username2',
                    password:   'Password!123'
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('error')
                    expect(res).to.not.have.header('Set-Cookie');
                    done()
                })
        })

        it('fail to validate account with wrong password', (done) => {
            chai.request(server)
                .post('/auth/token-jwt')
                .set('Content-Type', 'application/json')
                .send({
                    username:   'username',
                    password:   'password!123'
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('error')
                    expect(res).to.not.have.header('Set-Cookie');
                    done()
                })
        })



    })
})
