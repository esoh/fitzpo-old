function createExerciseLog(date, exerciseName, type, progress){
    return fetch('/user/exercise-logs', {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            date,
            exerciseName,
            type,
            progress,
        })
    })
        .then(res => res.json());
}

function getUserExerciseLogs(){
    return fetch('/user/exercise-logs')
        .then(res => res.json());
}

module.exports = {
    createExerciseLog,
    getUserExerciseLogs,
}
