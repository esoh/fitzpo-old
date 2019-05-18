//3rd party modules
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const passport = require('passport')

const env = process.env.NODE_ENV || 'development'
const config = require('./config/config.js')[env]

const models = require('./models')
const routes = require('./routes')
const APIError = require('./utils/errorBuilder').APIError

// set up express app

const app = express()

// middleware
app.use(bodyParser.json())
app.use(passport.initialize())

app.use('/', routes)

// Default error handling middleware, must be defined last
app.use((err, req, res, next) => {
    console.error('============== START ERROR STACK TRACE ==============')
    console.error(err.stack)
    console.error('============== END ERROR STACK TRACE ==============')
    const error = new APIError({
        title: 'Unhandled Internal Server Error',
        detail: 'Server did not handle thrown error: ' + err.name,
        status: 500
    })
    res.status(500).send(error)
})








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
            console.error('Port ' + config.app_port + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error('Port ' + config.app_port + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

module.exports = server // exported for test
