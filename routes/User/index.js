const express = require('express');
const router = express.Router();

const Auth = require('./Auth')

router.use('/auth', Auth)

module.exports = router;