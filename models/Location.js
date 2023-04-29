const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocationSchema = new Schema({
    name: {
        type: String,
        require : true,
    },
    cordinate: {
        long: {
            type: Number,
            required: true
        },
        lat: {
            type: Number,
            required: true
        }
    },
    added_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'admin'
    },
    createdon : {
        type: Date,
        default: Date.now 
    }
});
const Location = mongoose.model('locations', LocationSchema);
module.exports = Location;