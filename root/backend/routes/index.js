const express = require('express');
const router = express.Router();
const accounts = require('./accounts');
const auth = require('./auth');
const users = require('./users');

router.get('/', (req, res) =>{
    res.send('HOME');
});

router.use('/accounts', accounts);
router.use('/auth', auth);
router.use('/users', users);

module.exports = router;
