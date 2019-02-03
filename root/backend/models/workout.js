const mongoose = require('mongoose')

const WorkoutSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    exercises: {
        type: [ExerciseSchema]
    }
});

const Workout = module.exports = mongoose.model('Workout', WorkoutSchema);
