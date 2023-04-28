const express = require('express');
const router = express.Router();

const {
    AddCar
} = require('../../controller/Admin/Car');
const fetchAdmin = require('../../middleware/FetchAdmin')

router.post('/', fetchAdmin, AddCar)

module.exports = router;