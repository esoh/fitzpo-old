// NODE_ENV can be set in the following ways:
// 1. export NODE_ENV=<put string here> OR SET NODE_ENV=<put string here> if on
//      windows
// 2. run your app (NODE_ENV=<put string here> node app.js)
// 3. put NODE_ENV=<put string here> in .env

// import from .env
require('dotenv').config()

// default to 'dev'
const env = process.env.NODE_ENV || 'dev'

// localhost:27017/gymmate
const dev = {
    app: {
        port: parseInt(process.env.APP_PORT) || parseInt(process.env.DEV_APP_PORT) || 8080
    },
    db: {
        host: process.env.DB_HOST || process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DB_NAME || process.env.DEV_DB_NAME || 'gymmate'
    },
    auth: {
        secret: process.env.AUTH_SECRET || process.env.DEV_AUTH_SECRET || 'dev server secret'
    }
}

// localhost:27017/testGymmate
const test = {
    app: {
        port: parseInt(process.env.APP_PORT) || parseInt(process.env.TEST_APP_PORT) || 8080
    },
    db: {
        host: process.env.DB_HOST || process.env.TEST_DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || parseInt(process.env.TEST_DB_PORT) || 27017,
        name: process.env.DB_NAME || process.env.TEST_DB_NAME || 'testGymmate'
    },
    auth: {
        secret: process.env.AUTH_SECRET || process.env.TEST_AUTH_SECRET || 'test server secret'
    }
}

const prod = {
    app: {
        port: parseInt(process.env.APP_PORT) || parseInt(process.env.PROD_APP_PORT)
    },
    db: {
        host: process.env.DB_HOST || process.env.PROD_DB_HOST,
        port: parseInt(process.env.DB_PORT) || parseInt(process.env.PROD_DB_PORT),
        name: process.env.DB_NAME || process.env.PROD_DB_NAME
    },
    auth: {
        secret: process.env.AUTH_SECRET || process.env.PROD_AUTH_SECRET
    }
}

const config = {
    dev,
    test,
    prod
}

if(env == 'prod'){
    console.log("Using production environment")
} else if(env == 'test'){
    console.log("Using testing environment")
} else {
    console.log("Using development environment")
}
module.exports = config[env]
