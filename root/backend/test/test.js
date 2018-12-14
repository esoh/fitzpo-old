const assert = require('assert')
const mongoose = require('mongoose')

describe('Database tests', function(){

    // create a test database
    before(function(done){
        mongoose.connect('mongodb://localhost:27017/testGymmate', function(err){
            if(err) throw err
            mongoose.connection.db.dropDatabase(function(err) {
                if(err) throw err
                console.log("Dropped existing database")
                done();
            });
        })
        mongoose.connection.on('error', (err) => {
            console.log('Database Error' + err)
        })
        mongoose.connection.on('connected', () => {
            console.log('Connected to database');
        })
    })

    describe('Testing test', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1,2,3].indexOf(4), -1);
        });
    })

    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
            console.log("Closed connection")
        })
    })
})
