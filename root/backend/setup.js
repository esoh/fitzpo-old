module.exports = {
    // used with Sequelize, authenticates connection
    ensureConnection: function(sqlConnection, host, port){
        sqlConnection
            .authenticate()
            .then(() => {
                console.log("Connected to MySQL instance at " + host + ":" + port + ".")
                })
            .catch(err => { throw err })
    },
    // creates database if not used, use database
    useDatabase: function(sqlConnection, name){
        sqlConnection.query('CREATE DATABASE IF NOT EXISTS ' + name)
            .catch(err => { throw err })
        sqlConnection.query('USE ' + name)
            .then(() => {
                console.log("Using database " + name)
            })
            .catch(err => { throw err })
    }
}
