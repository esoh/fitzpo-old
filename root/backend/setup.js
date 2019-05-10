module.exports = {
    useDatabase: function(sqlConnection, name){
        sqlConnection.query('CREATE DATABASE IF NOT EXISTS ' + name, function(err){
            if (err) throw err
        })
        sqlConnection.query('USE ' + name, function(err){
            if(err) throw err
            console.log("Connected to database " + name + ".")
        })
    }
}
