const router = require('express').Router();

const usersController = require('../controllers/usersController');

router.route('/:username/exercise-history')
    .get(usersController.authenticateSelf, usersController.getUserExerciseHistory);

module.exports = router;
