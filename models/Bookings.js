const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'booking',
        required : true
    },
    carId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'booking',
        required : true
    }],
    location : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'locations',
        required : true
    },
    // pickuptime : {
    //     type: TimeRanges,
    //     required : true
    // },
    auto_pickup : {
        type : Boolean,
        default: true
    },
    duration:{
        type : Number,
        default: 1
    },
    durationdate : {
        from : {
            type: Date,
            default: Date.now 
        },
        to : {
            type: Date,
            default: Date.now 
        }
    },
    pickup_cordinate : {
        long : {
            type : Number,
        },
        lat : {
            type : Number,
        },
    },
    amount:{
        type : Number,
        required: true
    },
    status: {
        type : String,
        default : "initiative",
        enum : ["initiative", "active", "closed"]
    },
    session: {
        type : Object
    },
    createdon : {
        type: Date,
        default: Date.now 
    }
});
const booking = mongoose.model('booking', BookingSchema);
module.exports = booking;