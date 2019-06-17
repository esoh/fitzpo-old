const router = require('express').Router();

const userController = require('../controllers/userController');
const auth = require('../services/auth.service');

router.route('/exercise-logs')
    .get(auth.authUser, userController.getUserExerciseLogs)
    .post(auth.authUser, userController.createExerciseLog);

router.delete('/exercise-logs/:id', auth.authUser, userController.deleteExerciseLog)

module.exports = router;
