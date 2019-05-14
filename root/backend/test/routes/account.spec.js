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
})
