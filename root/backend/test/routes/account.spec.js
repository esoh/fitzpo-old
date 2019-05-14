const chai = require('chai')
const chaiHttp = require('chai-http')

const {Account} = require('../../models')
const server = require('../../app')

const expect = chai.expect

chai.use(chaiHttp)

describe('Accounts API', () => {

    beforeEach(() => {
        return Account.destroy({ truncate: true })
    })

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
                    done()
                })
        })
    })

    describe('/POST accounts', () => {
        it('fail to POST account with empty body', (done) => {
            chai.request(server)
                .post('/accounts')
                .set('Content-Type', 'application/json')
                .send({
                    // empty body
                })
                .end((err, res) => {
                    // TODO: check for error
                    expect(res).to.have.status(400)
                    done()
                })
        })
    })
})
