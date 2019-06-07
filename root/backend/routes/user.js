const router = require('express').Router();

const userController = require('../controllers/userController');
const auth = require('../services/auth.service');

router.route('/exercise-logs')
    .get(auth.authUser, userController.getUserExerciseLogs)
    .post(auth.authUser, userController.createExerciseLog);

module.exports = router;
