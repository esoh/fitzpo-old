const express = require('express');
const path = require('path'); // core module
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express(); // create an express application
const users = require('./routes/users'); // require ./routes/users.js
const port = 8080;// use whatever port to test

// CORS Middleware
// we want to make this public so any domain can access it but also restrict
// routes if the correct token is not provided.
// Note: this is the same as app.user('/', cors());
// Documentation: app.use(path='/', middleware)
app.use(cors()); // set whole app to use cors

// Set Static Folder
// this is the entire frontend, inside ./public/
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// We want to put user related code in ./routes/users.js. This says that
// site/users* will be handled by routes/users.js.
app.use('/users', users);

// Index Route
// route http: / to the callback function defined below.
// This function is called when a GET http request to "/" is made.
app.get('/', (req, res) => {
   res.send('Invalid Endpoint');
});

// Start Server
// () => {//code here} is a callback function that is called inside listen.
// You can also replace it with function(){//code here}
app.listen(port, () => {
   console.log('Server started on port ' + port);
});
