const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accountController')

const models = require('../models')

router.get('/', accountController.list)
router.post('/', accountController.post)

module.exports = router
