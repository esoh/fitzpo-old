const mysql = require('mysql')
const config = require('./config/config')

var connection = mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password
})

connection.connect(function(err){
    if (err) throw err
    console.log("Connected to MySQL instance at " + config.db.host + ":" + config.db.port + ".")

    // connect to database
    connection.query('CREATE DATABASE IF NOT EXISTS ' + config.db.name, function(err){
        if (err) throw err
        console.log("Connected to database " + config.db.name + ".")
    })

    connection.end()
})
