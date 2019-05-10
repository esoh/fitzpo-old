const models = require('../models')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    models.Account.findAll()
        .then((accounts) => {
            res.send(accounts)
        })
})

module.exports = router
