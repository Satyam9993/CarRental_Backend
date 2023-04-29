const mongoose = require('mongoose');
const { Schema } = mongoose;

const CarSchema = new Schema({
    name: {
        type: String,
        require : true,
    },
    desc : {
        type : String,
        required : true,
    },
    imageSrc : {
        type: String,
        required: true
    },
    imageAlt : {
        type: String,
        default : 'Cars'
    },
    isbooked : {
        type : Boolean,
        default : false
    },
    booked_by : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }],
    price:{
        type : "String",
        required : true
    },
    color : {
        type : "String",
        required : true
    },
    location : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'locations',
        required : true
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
const cars = mongoose.model('cars', CarSchema);
module.exports = cars;