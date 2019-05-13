const express = require('express')
const router = express.Router()
const account = require('../controllers/accountController')

const models = require('../models')

router.get('/', account.list)
router.post('/', account.post)

module.exports = router
