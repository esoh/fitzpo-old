const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accountController')

router.get('/', accountController.listAccounts)
router.post('/', accountController.registerAccount)

module.exports = router
