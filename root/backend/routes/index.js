const express = require('express')
const router = express.Router()
const accounts = require('./accounts')
const auth = require('./auth')

router.get('/', (req, res) =>{
    res.send('HOME')
})

router.use('/accounts', accounts)
router.use('/auth', auth)

module.exports = router
