const express = require('express');
const router = express.Router();

const User = require('./User/index');
const Admin = require('./Admin/index');

router.use('/admin', Admin);
router.use('/', User);

module.exports = router;