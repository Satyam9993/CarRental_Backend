const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminIdSchema = new Schema({
    adminId: {
        type: Number,
    }
});
const adminId = mongoose.model('adminId', adminIdSchema);
module.exports = adminId;