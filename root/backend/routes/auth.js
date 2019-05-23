const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.route('/token')
    .post(authController.authenticateAccount)
    .delete(authController.deauthenticateAccountLocally)

module.exports = router
