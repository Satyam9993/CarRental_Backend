const express = require('express');
const router = express.Router();

const {
    AddLocation
} = require('../../controller/Admin/Location');
const fetchAdmin = require('../../middleware/FetchAdmin')

// router.get('/');

router.post('/', fetchAdmin, AddLocation);

module.exports = router;