//3rd party modules
const express = require('express')
const http = require('http')

const env = process.env.NODE_ENV || 'dev'
const config = require('./config/config.js')[env]

const models = require('./models')
const routes = require('./routes')

// set up express app

const app = express()

app.use('/', routes)




// start the server
// maybe move this to ./bin/www?
//
// sync models that have not been synced yet, then start the server
models.sequelize.sync()
    .then(() => {
        app.listen(config.app.port, () => {
            console.log('Server listening on port ' + config.app.port)
        })
    })
    .catch(err => { throw err })


