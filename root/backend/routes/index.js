const express = require('express');
const router = express.Router();
const accounts = require('./accounts');
const auth = require('./auth');
const users = require('./users');
const user = require('./user');

router.get('/', (req, res) =>{
    res.send('HOME');
});

router.use('/accounts', accounts);
router.use('/auth', auth);
router.use('/users', users);
router.use('/user', user);

module.exports = router;
