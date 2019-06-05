const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.route('/')
    .post(accountController.registerAccount);

module.exports = router;
