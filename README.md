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

#### Before deploying
1. Define your own session secret string in ./config/database.js
1. Change appropriate URLs to servers

## API Documentation

### Users

Request | Details | Implemented?
-- | -- | --
POST /users | Adds a new user for registration | yes
GET /users/:username | Gets username if exists, else returns empty JSON object | yes
GET /users/emails/:emails | Gets email if exists, else returns empty JSON object | yes

### Sessions

Request | Details | Implemented?
-- | -- | --
POST /sessions | Creates a new login session | no
