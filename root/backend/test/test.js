const assert = require('assert')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

chai.use(chaiHttp)

describe('Database tests', function(){

    // connect to database to drop it
    before(function(done){
        mongoose.connect('mongodb://localhost:27017/gymmate', function(err){
            if(err) throw err
            mongoose.connection.db.dropDatabase(function(err) {
                if(err) throw err
                console.log("Dropped existing database")
                mongoose.connection.close(function(err){
                    if(err) throw err
                    console.log("Disconnected from database")
                    done()
                })
            })
        })
        mongoose.connection.on('error', (err) => {
            console.log('Database Error' + err)
        })
        mongoose.connection.on('connected', () => {
            console.log('Connected to database')
        })
    })

    // Template test
    describe('Testing test', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1,2,3].indexOf(4), -1)
        })
    })

    // POST /users/
    describe('Testing POST to /users/', function() {

        // Missing params
        describe('POST with empty body', function() {
            it('should fail with code 422', function(done) {
                chai.request('http://localhost:8080')
                    .post('/users')
                    .set('Content-Type', 'application/json')
                    .send({
                        // empty body
                    })
                    .end(function(err, res){
                        expect(err).to.be.null
                        expect(res).to.have.status(422)
                        done()
                    })
            })
        })
    })
})
