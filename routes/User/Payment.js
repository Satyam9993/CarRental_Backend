const express = require('express');
const router = express.Router();

const {
    payment,
    Success
} = require('../../controller/User/Payment');
const fetchuser = require('../../middleware/FetchUser');

router.post("/create-checkout-session",fetchuser, payment)

router.get('/success',  Success)

module.exports = router;