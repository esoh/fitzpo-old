# Fitzpo
This repo contains the web app powering Fitzpo.

## Getting started

### Prerequisities
1. Git
1. Node.js
1. A clone of the repo: `git clone https://github.com/esoh/fitzpo`
1. MongoDB

### React.js website
#### Installing dependencies
1. `cd fitzpo/root/frontend/react-src` to go to react directory
1. `npm i` to install dependencies

#### Running locally
1. `npm start` to run the development server
1. `open http://localhost:3000` to open the site in browser, or enter in `http://localhost:3000` in the browser address bar

### Express.js/Node.js server
#### Installing dependencies
1. `cd fitzpo/root/backend` to go to express directory
1. `npm i` to install dependencies

#### Running locally
1. Run the MongoDB service on default port 27017
1. `npm start` to run the express server on default port 8080

    Developer note: running `nodemon` is suggested to prevent having to restart the server every time a write is made to the server code. `npm install -g nodemon` will install nodemon globally.

#### Testing the API
1. `cd fitzpo/root/backend` to go to express directory
1. Run the express server with `NODE_ENV=test npm start`. See the [wiki](https://github.com/esoh/fitzpo/wiki/Environments,-Secrets,-and-Keys) for more details and options about environmental variables.
1. Run `npm test` to run the tests.

#### Before deploying
Make sure to define your own production environmental variables and select the production environment (See the [wiki](https://github.com/esoh/fitzpo/wiki/Environments,-Secrets,-and-Keys#production-environment) for variables that must be set).

#### Config
See the [wiki](https://github.com/esoh/fitzpo/wiki/Environments,-Secrets,-and-Keys) for configurable options.

## Contributing
You can contribute to our app! If you've found a fix to an issue or a new feature that needs implementing, then follow the instructions below.

1. Create a fork of the repository.
1. In your own fork, create a branch with a name that loosely describes your change.
1. Make your changes in this branch. Do your best to follow the [Angular commit guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits) for naming your commits and to follow the coding style.
1. If your fork's master branch becomes out of date with master, then update your fork using the compare & pull request.
1. Rebase your commits off the updated master.
1. Create a pull request in our repository with your fork's branch.