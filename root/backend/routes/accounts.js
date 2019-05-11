const express = require('express')
const router = express.Router()

const models = require('../models')


router.get('/', (req, res) => {
    models.Account.findAll()
        .then(accounts => {
            res.send(accounts)
        })
})

module.exports = router
