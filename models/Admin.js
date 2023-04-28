const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    adminId: {
        type: String,
        unique : true,
        require : true,
    },
    email: {
        type: String,
        unique : true,
        require : true,
    },
    password : {
        type: String,
        required: true,
    },
    createdon : {
        type: Date,
        default: Date.now 
    }
});

const Admin = mongoose.model('admin', AdminSchema);
module.exports = Admin;