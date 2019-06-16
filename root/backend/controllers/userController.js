const { ExerciseLog } = require('../models');

function getUserExerciseLogs(req, res, next){
    // authenticated user will be stored in req.user by passport middleware
    let userId = req.user.uuid;
    return ExerciseLog.getExerciseLogs(userId)
        .then(exerciseLogs => {
            exerciseLogs = exerciseLogs.map(log => ({
                id:             log.id,
                date:           log.date,
                exerciseName:   log.exerciseName,
                type:           log.type,
                progress:       log.progress,
            }))
            res.status(200).send({ exerciseLogs });
        })
        .catch(next);
}

function createExerciseLog(req, res, next){
    // authenticated user will be stored in req.user by passport middleware
    let userId = req.user.uuid;
    return ExerciseLog.addExerciseLog(userId,
                                      req.body.date,
                                      req.body.exerciseName,
                                      req.body.type,
                                      req.body.progress)
        .then(exerciseLog => {
            // TODO: send reference to created log?? Idk if that even makes
            // sense to do
            // TODO: filter only data that you need?
            res.status(201).send({ exerciseLog });
        })
        .catch(next);
}

module.exports = {
    getUserExerciseLogs,
    createExerciseLog,
};
