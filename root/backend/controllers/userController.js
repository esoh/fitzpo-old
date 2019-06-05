// defines the strategy that calls the Account model functions
const authService = require('../services/auth.service');
const passport = require('passport');

const { UserUnauthorizedError } = require('../utils/APIError');
const {
    User,
    ExerciseLog,
} = require('../models');

function getUserExerciseHistory(req, res, next){
    // called after passport, so req.user is set
    return User.findByUsername(req.params.username)
        .then(user => {
            return ExerciseLog.getExerciseHistory(user.uuid);
        })
        .then(exerciseLogs => {
            res.status(200).send({ exerciseLogs });
        })
        .catch(next);
}

// used to authenticate user to access user's own resources
function authenticateSelf(req, res, next){
    passport.authenticate('jwt', function(err, user, info){
        if(err){ return next(err); }
        if(!user || user.username != req.params.username){
            return new UserUnauthorizedError().sendToRes(res);
        }
        return next();
    })(req, res, next);
}

module.exports = {
    getUserExerciseHistory,
    authenticateSelf,
}
