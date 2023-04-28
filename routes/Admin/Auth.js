const express = require('express');
const router = express.Router();

const { 
    AdminLogin,
    AdminSignIn
} = require('../../controller/Admin/Auth');

router.post('/login', AdminLogin)
router.post('/Signin', AdminSignIn)

module.exports = router;