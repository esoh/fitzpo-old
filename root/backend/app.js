//3rd party modules
const express = require('express')
const http = require('http')

const env = process.env.NODE_ENV || 'development'
const config = require('./config/config.js')[env]

const models = require('./models')
const routes = require('./routes')

// set up express app

const app = express()

app.use('/', routes)











// start the server
// maybe move this to ./bin/www?
//
const server = http.createServer(app)

// sync models that have not been synced yet, then start the server
models.sequelize.sync()
    .then(() => {
        server.listen(config.app_port, () => {
            console.log('Server listening on port ' + config.app_port)
        })

        server.on('error', onError)
    })
    .catch(err => { throw err })


function onError(error){
    if (error.syscall !== 'listen') throw error

    // handle access and address in use errors gracefully
    switch (error.code) {
        case 'EACCES':
            console.error('Port ' + config_app.port + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error('Port ' + config_app.port + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}
