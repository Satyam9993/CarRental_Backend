const express = require('express');
const router = express.Router();

const Auth = require('./Auth.js');
const Car = require('./Car.js');
const Location = require('./Location.js');

router.use('/auth', Auth)
router.use('/car', Car)
router.use('/location', Location)

module.exports = router;