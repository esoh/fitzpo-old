const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const config = require('../config/config')
const User = require('../models/user')
const expect = chai.expect
const assert = chai.assert

const { db: { host, port, name } } = config;
const dbURL = `mongodb://${host}:${port}/${name}`
const expressURL = 'http://localhost:' + config.app.port

chai.use(chaiHttp)

describe('Database tests', function(){

    // connect to database to drop it
    before(function(done){
        mongoose.connect(dbURL, function(err){
            if(err) throw err
            mongoose.connection.db.dropDatabase(function(err) {
                if(err) throw err
                console.log("Dropped existing database")
                done()
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
        describe('Test with missing params', function() {

            describe('POST with empty body', function() {
                it('should fail with code 422', function(done) {
                    chai.request(expressURL)
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

            describe('POST without email', function() {
                it('should fail with code 422', function(done) {
                    chai.request(expressURL)
                        .post('/users')
                        .set('Content-Type', 'application/json')
                        .send({
                            username: "Username",
                            password: "Password!123"
                        })
                        .end(function(err, res){
                            expect(err).to.be.null
                            expect(res).to.have.status(422)
                            done()
                        })
                })
            })

            describe('POST without username', function() {
                it('should fail with code 422', function(done) {
                    chai.request(expressURL)
                        .post('/users')
                        .set('Content-Type', 'application/json')
                        .send({
                            email: "validEmail@gmail.com",
                            password: "Password!123"
                        })
                        .end(function(err, res){
                            expect(err).to.be.null
                            expect(res).to.have.status(422)
                            done()
                        })
                })
            })

            describe('POST without password', function() {
                it('should fail with code 422', function(done) {
                    chai.request(expressURL)
                        .post('/users')
                        .set('Content-Type', 'application/json')
                        .send({
                            username: "Username",
                            email: "validEmail@gmail.com",
                        })
                        .end(function(err, res){
                            expect(err).to.be.null
                            expect(res).to.have.status(422)
                            done()
                        })
                })
            })
        })

        // Incorrect params
        describe('Test with incorrect params', function() {

            describe('POST with invalid username', function() {
                it('should fail with code 422', function(done) {
                    chai.request(expressURL)
                        .post('/users')
                        .set('Content-Type', 'application/json')
                        .send({
                            username: "user name",
                            email: "validEmail@gmail.com",
                            password: "Password!123"
                        })
                        .end(function(err, res){
                            expect(err).to.be.null
                            expect(res).to.have.status(422)
                            done()
                        })
                })
            })

            describe('POST with invalid email', function() {
                it('should fail with code 422', function(done) {
                    chai.request(expressURL)
                        .post('/users')
                        .set('Content-Type', 'application/json')
                        .send({
                            username: "username99",
                            email: "invalidEmail",
                            password: "Password!123"
                        })
                        .end(function(err, res){
                            expect(err).to.be.null
                            expect(res).to.have.status(422)
                            done()
                        })
                })
            })

            describe('POST with invalid password', function() {
                it('should fail with code 422', function(done) {
                    chai.request(expressURL)
                        .post('/users')
                        .set('Content-Type', 'application/json')
                        .send({
                            username: "username99",
                            email: "validEmail@gmail.com",
                            password: "Password123"
                        })
                        .end(function(err, res){
                            expect(err).to.be.null
                            expect(res).to.have.status(422)
                            done()
                        })
                })
            })
        })

        describe('Test with successful adds', function() {
            let validPassword= "Password!123"

            describe('POST with valid body', function() {
                it('should return username', function(done){
                    chai.request(expressURL)
                        .post('/users')
                        .set('Content-Type', 'application/json')
                        .send({
                            username: "username",
                            email: "email@email.com",
                            password: validPassword
                        })
                        .end(function(err, res){
                            expect(err).to.be.null
                            expect(res).to.have.status(201)
                            var expectedResponse = {
                                username: "username"
                            }
                            expect(res.body).to.eql(expectedResponse)
                            done()

                        })
                })
            })

            describe('Ensure password is hashed', function(){
                it('should return to false', function(done){
                    User.findOne({
                        username: "username"
                    }, function postQuery(err, user){
                        if(err) return err
                        if(!user) return done(new Error("User not found"))
                        expect(user.password).to.not.eql(validPassword)
                        done()
                    })
                })
            })

            describe('POST with valid body with same password', function() {
                it('should return username2', function(done){
                    chai.request(expressURL)
                        .post('/users')
                        .set('Content-Type', 'application/json')
                        .send({
                            username: "username2",
                            email: "email2@email.com",
                            password: validPassword
                        })
                        .end(function(err, res){
                            expect(err).to.be.null
                            expect(res).to.have.status(201)
                            var expectedResponse = {
                                username: "username2"
                            }
                            expect(res.body).to.eql(expectedResponse)
                            done()

                        })
                })
            })

            describe('Ensure hashes are not the same', function(){
                it('password hashes should not be the same', function(done){
                    User.findOne({
                        username: "username"
                    }, function postQuery(err, user){
                        if(err) return err
                        if(!user) return done(new Error("User not found"))
                        User.findOne({
                            username: "username2"
                        }, function secondPostQuery(err, user2){
                            if(err) return err
                            if(!user2) return done(new Error("User not found"))
                            expect(user.password).to.not.eql(user2.password)
                            done()
                        })
                    })
                })
            })

            describe('POST with valid body with username "User-Name_."', function() {
                it('should return "User-Name_."', function(done){
                    chai.request(expressURL)
                        .post('/users')
                        .set('Content-Type', 'application/json')
                        .send({
                            username: "User-Name_.",
                            email: "vemail@email.com",
                            password: validPassword
                        })
                        .end(function(err, res){
                            expect(err).to.be.null
                            expect(res).to.have.status(201)
                            var expectedResponse = {
                                username: "User-Name_."
                            }
                            expect(res.body).to.eql(expectedResponse)
                            done()

                        })
                })
            })

            describe('Ensure that case is preserved in database', function(){
                it('should return correct case', function(done){
                    User.findOne({
                        username: "User-Name_."
                    }, function postQuery(err, user){
                        if(err) return err
                        if(!user) return done(new Error("User not found"))
                        expect(user.username).to.not.eql("user-name_.")
                        expect(user.username).to.eql("User-Name_.")
                        done()
                    })
                })
            })
        })

        describe('Test with duplicates', function() {

            describe('POST with duplicate username', function() {
                it('should fail with status code 409', function(done){
                    chai.request(expressURL)
                        .post('/users')
                        .set('Content-Type', 'application/json')
                        .send({
                            username: "username",
                            email: "email3@email.com",
                            password: "password!123"
                        })
                        .end(function(err, res){
                            expect(err).to.be.null
                            expect(res).to.have.status(409)
                            expect(res.body.should.have.property('error'))
                            expect(res.body.error.should.have.property('errorType'))
                            expect(res.body.error.errorType.should.equal('duplicateKeyError'))
                            expect(res.body.error.should.have.property('message'))
                            expect(res.body.error.message.should.equal('Username is taken'))
                            done()
                        })
                })
            })

            describe('POST with duplicate email', function() {
                it('should fail with status code 409', function(done){
                    chai.request(expressURL)
                        .post('/users')
                        .set('Content-Type', 'application/json')
                        .send({
                            username: "username3",
                            email: "email@email.com",
                            password: "password!123"
                        })
                        .end(function(err, res){
                            expect(err).to.be.null
                            expect(res).to.have.status(409)
                            expect(res.body.should.have.property('error'))
                            expect(res.body.error.should.have.property('errorType'))
                            expect(res.body.error.errorType.should.equal('duplicateKeyError'))
                            expect(res.body.error.should.have.property('message'))
                            expect(res.body.error.message.should.equal('Email is in use'))
                            done()
                        })
                })
            })

            describe('POST with username that is taken but with different case', function() {
                it('should fail with status code 409', function(done){
                    chai.request(expressURL)
                        .post('/users')
                        .set('Content-Type', 'application/json')
                        .send({
                            username: "usernamE2",
                            email: "email4@email.com",
                            password: "password!123"
                        })
                        .end(function(err, res){
                            expect(err).to.be.null
                            expect(res).to.have.status(409)
                            expect(res.body.should.have.property('error'))
                            expect(res.body.error.should.have.property('errorType'))
                            expect(res.body.error.errorType.should.equal('duplicateKeyError'))
                            expect(res.body.error.should.have.property('message'))
                            expect(res.body.error.message.should.equal('Username is taken'))
                            done()
                        })
                })
            })

            describe('POST with email that is in use but with different case', function() {
                it('should fail with status code 409', function(done){
                    chai.request(expressURL)
                        .post('/users')
                        .set('Content-Type', 'application/json')
                        .send({
                            username: "username4",
                            email: "emAil@email.com",
                            password: "password!123"
                        })
                        .end(function(err, res){
                            expect(err).to.be.null
                            expect(res).to.have.status(409)
                            expect(res.body.should.have.property('error'))
                            expect(res.body.error.should.have.property('errorType'))
                            expect(res.body.error.errorType.should.equal('duplicateKeyError'))
                            expect(res.body.error.should.have.property('message'))
                            expect(res.body.error.message.should.equal('Email is in use'))
                            done()
                        })
                })
            })
        })
    })

    // drop database
    /*after(function(done){
        mongoose.connection.db.dropDatabase(function(err) {
            if(err) throw err
            console.log("Dropped existing database")
            mongoose.connection.close(function(err){
                if(err) throw err
                console.log("Disconnected from database")
                done()
            })
        })
    })*/

    after(function(done){
        mongoose.connection.close(function(err){
            if(err) throw err
            console.log("Disconnected from database")
            done()
        })
    })
})
