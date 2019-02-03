const express = require('express')
const router = express.Router()
const Exercise = require('../models/exercise')

// returns the list of all exercises pertaining to search
router.get('/:name', (req, res, next) => {
    let name = null
    if (req.params.name !== "zqww9") {
        name = {name: new RegExp(req.params.name, "i")}
    }
    Exercise.find(name, (err, exercise) => {
        if (!exercise) {
            return res.json({success: false, msge: 'Exercise not found'})
        } else {
            let data = {
                exercise: exercise
            }
            return res.json(data)
        }
    })
})

// route to create a new exercise in the database
router.post('/', (req, res, next) => {
    if (req.body.name && req.body.description) {
        let newExercise = new Exercise({
            name: req.body.name,
            description: req.body.description
        });
        newExercise.save()
        return res.status(201).send({
            name: req.body.name
        })
    } else {
        // return bad request status code if either is empty
        return res.status(400).send()
    }
})

// route to delete an exercise from table given a name
router.delete('/:name', (req, res, next) => {
    Exercise.findOneAndRemove( {_id: req.params.name}, (err, exercise) => {
        if (!exercise) {
            return res.json({success: false, msge: 'Exercise not found'})
        } else {
            return res.json({success: true, msge: req.params.name + 'deleted'})
        }
    })
})

module.exports = router;
