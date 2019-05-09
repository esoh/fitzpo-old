// NODE_ENV can be set in the following ways:
// 1. export NODE_ENV=<put string here> OR SET NODE_ENV=<put string here> if on
//      windows
// 2. run your app (NODE_ENV=<put string here> node app.js)
// 3. put NODE_ENV=<put string here> in .env

// import from .env
require('dotenv').config({path:__dirname+'/../.env'})

// default to 'dev'
const env = process.env.NODE_ENV || 'dev'

const APP_PORT = parseInt(process.env.APP_PORT)
const DB_HOST = process.env.DB_HOST
const DB_PORT = parseInt(process.env.DB_PORT)
const DB_NAME = process.env.DB_NAME
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const AUTH_SECRET = process.env.AUTH_SECRET
const DEV_APP_PORT = parseInt(process.env.DEV_APP_PORT)
const DEV_DB_HOST = process.env.DEV_DB_HOST
const DEV_DB_PORT = parseInt(process.env.DEV_DB_PORT)
const DEV_DB_NAME = process.env.DEV_DB_NAME
const DEV_DB_USERNAME = process.env.DEV_DB_USERNAME
const DEV_DB_PASSWORD = process.env.DEV_DB_PASSWORD
const DEV_AUTH_SECRET = process.env.DEV_AUTH_SECRET
const TEST_APP_PORT = parseInt(process.env.TEST_APP_PORT)
const TEST_DB_HOST = process.env.TEST_DB_HOST
const TEST_DB_PORT = parseInt(process.env.TEST_DB_PORT)
const TEST_DB_NAME = process.env.TEST_DB_NAME
const TEST_DB_USERNAME = process.env.TEST_DB_USERNAME
const TEST_DB_PASSWORD = process.env.TEST_DB_PASSWORD
const TEST_AUTH_SECRET = process.env.TEST_AUTH_SECRET
const PROD_APP_PORT = parseInt(process.env.PROD_APP_PORT)
const PROD_DB_HOST = process.env.PROD_DB_HOST
const PROD_DB_PORT = parseInt(process.env.PROD_DB_PORT)
const PROD_DB_NAME = process.env.PROD_DB_NAME
const PROD_DB_USERNAME = process.env.PROD_DB_USERNAME
const PROD_DB_PASSWORD = process.env.PROD_DB_PASSWORD
const PROD_AUTH_SECRET = process.env.PROD_AUTH_SECRET

const def = {
    app: {
        port: 8080
    },
    db: {
        host: 'localhost',
        port: 3306,
        name: 'fitzpo',
        user: 'root',
        password: 'password'
    },
    auth: {
        secret: 'your own server secret here'
    },
    S3: {
        secretAccessKey: process.env.S3_SECRET_KEY,
        accessKeyId: process.env.S3_KEY,
        region: process.env.S3_REGION
    }
}

// localhost:3306/gymmate
const dev = {
    app: {
        port: APP_PORT || DEV_APP_PORT || def.app.port
    },
    db: {
        host: DB_HOST || DEV_DB_HOST || def.db.host,
        port: DB_PORT || DEV_DB_PORT || def.db.port,
        name: DB_NAME || DEV_DB_NAME || def.db.name,
        user: DB_USERNAME || DEV_DB_USERNAME || def.db.user,
        password: DB_PASSWORD || DEV_DB_PASSWORD || def.db.password
    },
    auth: {
        secret: AUTH_SECRET || DEV_AUTH_SECRET || 'dev server secret'
    },
    S3: def.S3
}

// localhost:3306/testGymmate
const test = {
    app: {
        port: APP_PORT || TEST_APP_PORT || def.app.port
    },
    db: {
        host: DB_HOST || TEST_DB_HOST || def.db.host,
        port: DB_PORT || TEST_DB_PORT || def.db.port,
        name: DB_NAME || TEST_DB_NAME || 'test_' + def.db.name,
        user: DB_USERNAME || TEST_DB_USERNAME || def.db.user,
        password: DB_PASSWORD || TEST_DB_PASSWORD || def.db.password
    },
    auth: {
        secret: AUTH_SECRET || TEST_AUTH_SECRET || 'test server secret'
    },
    S3: def.S3
}

const prod = {
    app: {
        port: APP_PORT || PROD_APP_PORT
    },
    db: {
        host: DB_HOST || PROD_DB_HOST,
        port: DB_PORT || PROD_DB_PORT,
        name: DB_NAME || PROD_DB_NAME,
        user: DB_USERNAME || PROD_DB_USERNAME,
        password: DB_PASSWORD || PROD_DB_PASSWORD
    },
    auth: {
        secret: AUTH_SECRET || PROD_AUTH_SECRET
    },
    S3: def.S3
}

const config = {
    dev,
    test,
    prod
}

if(env == 'prod'){
    console.log("Using production environment.")
} else if(env == 'test'){
    console.log("Using testing environment.")
} else {
    console.log("Using development environment.")
}
module.exports = config[env]
