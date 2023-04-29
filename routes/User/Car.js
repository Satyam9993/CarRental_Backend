const express = require('express');
const router = express.Router();

const {
    getAllCars
} = require('../../controller/User/Car');

router.get('/', getAllCars);

module.exports = router;