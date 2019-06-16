// defines the strategy that calls the Account model functions
const authService = require('../services/auth.service');
const passport = require('passport');

const {
    UnauthorizedError,
    UserNotFoundError,
    InvalidTokenError,
} = require('../utils/APIError');
const {
    User,
    ExerciseLog,
} = require('../models');

function getUserExerciseHistory(req, res, next){
    // called after passport, so req.user is set
    return User.findByUsername(req.params.username)
        .then(user => {
            if(!user) return new UserNotFoundError().sendToRes(res);

            return ExerciseLog.getExerciseLogs(user.uuid);
        })
        .then(exerciseLogs => {
            exerciseLogs = exerciseLogs.map(log => {
                return {
                    date:           log.date,
                    exerciseName:   log.exerciseName,
                    type:           log.type,
                    progress:       log.progress,
                }
            })
            res.status(200).send({ exerciseLogs });
        })
        .catch(next);
}

// used to authenticate user to access user's own resources
// TODO: change this function to check if authorized user has access to target
// user's resources! (e.g. target user shares history with friends then friend
// can access it)
function authenticateSelf(req, res, next){
    // TODO: replace this with authservice's jwtAuth
    passport.authenticate('jwt', function(err, user, info){
        if(err){ return next(err); }
        if(info) {
            switch(info.name){
                case 'Error':
                    if(info.message == 'No auth token'){
                        return new UnauthorizedError().sendToRes(res);
                    }
                case 'JsonWebTokenError':
                    return new InvalidTokenError().sendToRes(res);
                default:
                    console.log(info);
            }
        }

        // no user was found with the given token payload id
        if(!user) return new InvalidTokenError().sendToRes(res);

        return User.findByUsername(req.params.username)
            .then(targetUser => {
                if(!targetUser) { return UserNotFoundError().sendToRes(res); }
                if(targetUser.username !== user.username){ return new UnauthorizedError().sendToRes(res); }
                return next();
            });
    })(req, res, next);
}

module.exports = {
    getUserExerciseHistory,
    authenticateSelf,
}
