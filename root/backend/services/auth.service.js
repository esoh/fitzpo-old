const LocalStrategy = require('passport-local')

const {Account} = require('../models')

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            Account.authorize(username, password)
                .then(account => {
                    if(!account) {
                        return done(null, false)
                    }
                    return done(account)
                })
                .catch(err => { return done(err) })
        }
    ))
}
