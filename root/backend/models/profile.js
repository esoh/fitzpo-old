//https://www.youtube.com/watch?v=srPXMt1Q0nY
//https://www.youtube.com/watch?v=ASuU4km3VHE
const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    username: {
        type: String
    },
    img: {
        type: String
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    age: {
        type: String,
        trim: true,
        match: /^\d+$/
    },
    bio: {
        type: String,
        trim: true
    },
    height: {
        type: String,
        trim: true
    },
    weight: {
        type: String,
        trim: true
    },
    goals: {
        type: String,
        trim: true
    }
});

var Profile = module.exports = mongoose.model('Profile', ProfileSchema);
