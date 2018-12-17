# GymMate
This repo contains the web app powering GymMate.

## Getting started

### Prerequisities
1. Git
1. Node.js
1. A clone of the repo: `git clone https://github.com/esoh/gymmate`
1. MongoDB

### React.js website
#### Installing dependencies
1. `cd gymmate/root/frontend/react-src` to go to react directory
1. `npm i` to install dependencies

#### Running locally
1. `npm start` to run the development server
1. `open http://localhost:3000` to open the site in browser, or enter in `http://localhost:3000` in the browser address bar

### Express.js/Node.js server
#### Installing dependencies
1. `cd gymmate/root/backend` to go to express directory
1. `npm i` to install dependencies

#### Running locally
1. Run the MongoDB service on default port 27017
1. `npm start` to run the express server on default port 8080

    Developer note: running `nodemon` is suggested to prevent having to restart the server every time a write is made to the server code. `npm install -g nodemon` will install nodemon globally.

#### Testing the API
1. `cd gymmate/root/backend` to go to express directory
1. Run the express server with NODE_ENV="test" (See [Setting Environments](#env)).
1. Run `npm test` to run the tests.

#### Before deploying
Make sure you define your own production environmental variables (See [Setting Environments](#env)). Things that need to be defined include:
* PROD_APP_PORT
* PROD_DB_HOST
* PROD_DB_PORT
* PROD_DB_NAME
* PROD_AUTH_SECRET

#### <a name="env"></a> Setting production, testing, and development environments

By default, the app uses the development environment. You can set your own environment and other options like database and ports using environmental variables. These can be defined in `gymmate/root/backend/config/.env` in the form of `NAME=VALUE`. E.g.

    NODE_ENV="test"
    TEST_DB_NAME="testdb"
    TEST_APP_PORT=8080
    PROD_AUTH_SECRET="super secret auth secret"
It can also be set as global environmental variables `export NAME=VALUE` in Unix based shells, or as `SET NAME=VALUE` in Windows CMD.

They can also be defined prepending the express app command to be applied to a specific run instance. For example:
    
    NODE_DEV="test" nodemon

Things that can be set include: NODE_DEV=("test", "dev", or "prod"), APP_PORT, DB_HOST, DB_PORT, DB_NAME, and AUTH_SECRET. 

    Note: Besides NODE_DEV, the environmental vars can be prepended with their environment type to define the variables only for that specific environment type. 
    E.g. TEST_DB_NAME can be used to define the database only when NODE_ENV="test". Be aware that if DB_NAME is defined, it will be used instead of TEST_DB_NAME, like the other environmental variables.

## API Documentation

### Users

Request | Details | Implemented?
-- | -- | --
POST /users | Adds a new user for registration | yes
GET /users/:username | Gets username if exists, else returns empty JSON object | yes
GET /users/emails/:email | Gets email if exists, else returns empty JSON object | yes

### Sessions

Request | Details | Implemented?
-- | -- | --
POST /sessions | Creates a new login session | no
