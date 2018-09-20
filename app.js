const express = require('express');
const path = require('path'); // core module
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express(); // create an express application
const port = 8080;// use whatever port to test

app.listen(port, () => {
   console.log('Server started on port ' + port);
});
