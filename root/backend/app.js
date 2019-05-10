// 3rd party modules
const express = require('express')
const Sequelize = require('sequelize')

// setup & config
const config = require('./config/config')
const setup = require('./setup')

// routes
const users = require('./routes/users')

const port = config.app.port

// TODO: read up on connection pooling for production
const sequelize = new Sequelize('', config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql'
});

setup.ensureConnection(sequelize, config.db.host, config.db.port)
setup.useDatabase(sequelize, config.db.name)

const app = express()

//route /users to use the users module
app.use('/users', users)

app.listen(port, () => {
   console.log('Server started on port ' + port)
})
