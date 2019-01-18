const express = require('express');
const path = require('path'); // core module
const bodyParser = require('body-parser');
// const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/config');

// extract db from database
const { db: { host, port, name } } = config;
const dbURL = `mongodb://${host}:${port}/${name}`;

const app = express(); // create an express application
const users = require('./routes/users'); // require ./routes/users.js
const profiles = require('./routes/profiles') // require ./routs/users.js

// Connect to Database
mongoose.connect(dbURL);

// On Connection
mongoose.connection.on('connected', () => {
   console.log('Connected to database ' + dbURL);
});

// On Error
mongoose.connection.on('error', (err) => {
   console.log('Database Error' + err);
});

// CORS Middleware
// we want to make this public so any domain can access it but also restrict
// routes if the correct token is not provided.
// Note: this is the same as app.user('/', cors());
// Documentation: app.use(path='/', middleware)
// app.use(cors()); // set whole app to use cors

// Set Static Folder
// this is for static assets, inside ./public/
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// We want to put user related code in ./routes/users.js. This says that
// site/users* will be handled by routes/users.js.
app.use('/users', users);

// site/profiles* will be hadnled by routes/profiles.js
app.use('/profiles', profiles);

// Error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack)
    // It's not a good idea to expose some errors outside of the backend
    res.status(500).send({
        error: {
            message: "Unknown error. Check backend.",
            errorType: "UnknownError",
            error: ""
        }
    })
})

// Index Route
// route http: / to the callback function defined below.
// This function is called when a GET http request to "/" is made.
app.get('/', (req, res) => {
   res.send('Invalid Endpoint');
});

app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// Start Server
// () => {//code here} is a callback function that is called inside listen.
// You can also replace it with function(){//code here}
app.listen(config.app.port, () => {
   console.log('Server started on port ' + port);
});
