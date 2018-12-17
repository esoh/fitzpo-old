const assert = require('assert')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const config = require('../config/config')
const expect = chai.expect

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

        describe('Test with missing params', function() {

            // Missing params
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

        describe('Test with incorrect params', function() {

            // Incorrect params
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
                            username: "username",
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
                            username: "username",
                            email: "invalidEmail",
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

    })
})
