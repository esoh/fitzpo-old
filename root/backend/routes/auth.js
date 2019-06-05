const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.route('/token')
    .post(authController.authenticateUser);

router.delete('/cookie', authController.deleteTokenCookie);

router.get('/me', authController.getUserFromCookie);

module.exports = router;
