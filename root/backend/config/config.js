const fs = require('fs');
// import from .env
require('dotenv').config({path:__dirname+'/../.env'})

// need to set boolean vars using alt method because of bool(false) == bool(null)
setWithStrBool = function(str, alt){
    if(str == 'false'){
        return false
    } else {
        return alt
    }
}

defaults = {
    // used by sequelize
    username:       process.env.DB_USERNAME         || 'root',
    password:       process.env.DB_PASSWORD         || 'password',
    database:       process.env.DB_NAME             || 'fitzpo',
    host:           process.env.DB_HOST             || 'localhost',
    port:           parseInt(process.env.DB_PORT)   || 3306,
    dialect:        process.env.DB_DIALECT          || 'mysql',
    logging:        setWithStrBool(process.env.DB_LOGGING, console.log),

    // define your own
    app_port:       parseInt(process.env.APP_PORT)  ||  8080,
    auth_secret:    process.env.AUTH_SECRET         ||  'server secret',
    S3: {
        secretAccessKey:    process.env.S3_SECRET_KEY,
        accessKeyId:        process.env.S3_KEY,
        region:             process.env.S3_REGION
    }
}

// define your own variables in fitzpo/backend/.env
module.exports = {
    development: {
        username:       process.env.DEV_DB_USERNAME         ||  defaults.username,
        password:       process.env.DEV_DB_PASSWORD         ||  defaults.password,
        database:       process.env.DEV_DB_DATABASE         ||  defaults.database + "_dev",
        host:           process.env.DEV_DB_HOST             ||  defaults.host,
        port:           parseInt(process.env.DEV_DB_PORT)   ||  defaults.port,
        dialect:        process.env.DEV_DB_DIALECT          ||  defaults.dialect,
        logging:        setWithStrBool(process.env.DEV_DB_LOGGING, defaults.logging),

        app_port:       parseInt(process.env.DEV_APP_PORT)  ||  defaults.app_port,
        auth_secret:    process.env.DEV_AUTH_SECRET         ||  defaults.auth_secret,
        S3:                                                     defaults.S3
    },
    test: {
        username:       process.env.TEST_DB_USERNAME         ||  defaults.username,
        password:       process.env.TEST_DB_PASSWORD         ||  defaults.password,
        database:       process.env.TEST_DB_DATABASE         ||  defaults.database + "_test",
        host:           process.env.TEST_DB_HOST             ||  defaults.host,
        port:           parseInt(process.env.TEST_DB_PORT)   ||  defaults.port,
        dialect:        process.env.TEST_DB_DIALECT          ||  defaults.dialect,
        logging:        setWithStrBool(process.env.TEST_DB_LOGGING, defaults.logging),

        app_port:       parseInt(process.env.TEST_APP_PORT)  ||  defaults.app_port,
        auth_secret:    process.env.TEST_AUTH_SECRET         ||  defaults.auth_secret,
        S3:                                                      defaults.S3
    },
    production: {
        username:       process.env.PROD_DB_USERNAME,
        password:       process.env.PROD_DB_PASSWORD,
        database:       process.env.PROD_DB_DATABASE,
        host:           process.env.PROD_DB_HOST,
        port:           parseInt(process.env.PROD_DB_PORT),
        dialect:        process.env.PROD_DB_DIALECT,
        logging:        false,

        app_port:       parseInt(process.env.PROD_APP_PORT),
        auth_secret:    process.env.PROD_AUTH_SECRET,
        S3:             defaults.S3
    }
}
