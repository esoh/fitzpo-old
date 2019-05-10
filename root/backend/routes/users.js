const express = require('express')

const router = express.Router()
router.post('/', (req, res, next) => {

    console.log('HELLO')

    return res.sendStatus(200)
})

module.exports = router
