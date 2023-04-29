const express = require('express');
const router = express.Router();

const Auth = require('./Auth.js');
const Car = require('./Car.js');

router.use('/auth', Auth)
router.use('/car', Car)

module.exports = router;