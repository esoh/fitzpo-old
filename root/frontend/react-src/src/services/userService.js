import { toJson } from './errorService';

function createExerciseLog(date, exerciseName, type, progress){
    return fetch('/api/user/exercise-logs', {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            date,
            exerciseName,
            type,
            progress,
        })
    })
        .then(res => toJson(res));
}

function getUserExerciseLogs(){
    return fetch('/api/user/exercise-logs')
        .then(res => toJson(res));
}

function deleteExerciseLog(id){
    // have to make sure user is authorized to do this
    // check if user extracted from cookie is owner of this exercise log
    return fetch('/api/user/exercise-logs/' + id, { method: 'DELETE' });
}

export {
    createExerciseLog,
    getUserExerciseLogs,
    deleteExerciseLog,
}
