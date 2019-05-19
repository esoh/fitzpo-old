const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/token-jwt', authController.authenticateAccount)

module.exports = router
