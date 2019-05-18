const passport = require('passport')
const LocalStrategy = require('passport-local')
const {Account} = require('../../models')

passport.use(new LocalStrategy(
    function(username, password, done) {
        Account.findByUsername(username)
            .then(user => {
                if(!user){
                    return done(null, false, {
                        message: 'user not found' // TODO: verify only used for debugging
                    })
                }
                user.comparePassword(password)
                    .then(match => {
                        if(match){
                            return done(user)
                        } else {
                            return done(null, false, {
                                message: 'incorrect password' // TODO: verify only used for debugging
                            })
                        }
                    })
            })
            .catch(err => {
                console.log('error: ')
                console.log(error)
                return done(error)
            })
    }
))
