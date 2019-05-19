const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accountController')

router.post('/token-jwt', accountController.authenticateUser)

module.exports = router
