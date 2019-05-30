const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.route('/token')
    .post(authController.authenticateAccount)

router.delete('/cookie', authController.deauthenticateAccountLocally)

module.exports = router
