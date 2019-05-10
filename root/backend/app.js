// 3rd party modules
const express = require('express')
const mysql = require('mysql')

// setup & config
const config = require('./config/config')
const setup = require('./setup')

// routes
const users = require('./routes/users')

const port = config.app.port

// TODO: read up on connection pooling
var connection = mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password
})

connection.connect(function(err){
    if (err) throw err
    console.log("Connected to MySQL instance at " + config.db.host + ":" + config.db.port + ".")
})
//creates database if not exists
setup.useDatabase(connection, config.db.name)

const app = express()

//route /users to use the users module
app.use('/users', users)


app.listen(port, () => {
   console.log('Server started on port ' + port)
})

connection.end()
