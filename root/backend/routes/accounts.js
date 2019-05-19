const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accountController')

const models = require('../models')

router.get('/', accountController.listUsers)
router.post('/', accountController.registerUser)

module.exports = router
