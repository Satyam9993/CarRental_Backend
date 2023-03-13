const express = require('express');
const router = express.Router();

const Auth = require('./Auth/Auth')

router.use('/auth', Auth)

module.exports = router;