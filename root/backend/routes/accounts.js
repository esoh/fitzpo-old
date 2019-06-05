const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.route('/')
    .get(accountController.listAccounts)
    .post(accountController.registerAccount);

module.exports = router;
