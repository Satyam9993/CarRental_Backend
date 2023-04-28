const express = require('express');
const router = express.Router();
const {
    loginUser, 
    signInUser, 
    EmailVerification, 
    // loginUserdata
} = require("../../../controller/User/Auth/Auth")
// const fetchUser = require('../../middleware/fetchUser')


// Route - POST signin
router.post('/signin', signInUser)
router.post('/verifyotp', EmailVerification)

// Route - POST login
router.post('/login', loginUser)

// router.get('/login/data',fetchUser, loginUserdata)

module.exports = router;