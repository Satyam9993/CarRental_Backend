const express = require('express');
const router = express.Router();

const {
    getAllLocation
} = require('../../controller/User/Location');

router.get('/', getAllLocation);

module.exports = router;