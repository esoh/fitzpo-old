const router = require('express').Router();

const userController = require('../controllers/userController');

router.route('/:username/exercise-history')
    .get(userController.authenticateSelf, userController.getUserExerciseHistory);

module.exports = router;
