const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
});

var Exercise = module.exports = mongoose.model('Exercise', ExerciseSchema);
