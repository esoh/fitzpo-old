//3rd party modules
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieParser = require('cookie-parser')

const env = process.env.NODE_ENV || 'development'
const config = require('./config/config.js')[env]

const models = require('./models')
const routes = require('./routes')
const errorHandler = require('./services/errorHandler.service');

// set up express app

const app = express()

// middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(passport.initialize())

app.use(config.app_path, routes)

// error handling middleware, must be defined last
app.use(errorHandler.schemaErrorHandler)
app.use(errorHandler.defaultErrorHandler)








// start the server
// maybe move this to ./bin/www?
//
const server = http.createServer(app)

// sync models that have not been synced yet, then start the server
models.sequelize.sync()
    .then(() => {
        server.listen(config.app_port, () => {
            console.log('Server listening on localhost:' + config.app_port + '' + config.app_path)
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
