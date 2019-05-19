const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/token-jwt', authController.authorizeAccount)

module.exports = router
