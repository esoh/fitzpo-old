//3rd party modules
const express = require('express')

const models = require('./models')
const env = process.env.NODE_ENV || 'dev';
const config = require('./config/config.js')[env]
const routes = require('./routes')

const app = express()

app.use('/', routes)

app.listen(config.app.port, () => {
    console.log('Server started on port ' + config.app.port)
})
