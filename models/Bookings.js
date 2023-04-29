const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'booking'
    },
    carId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'booking'
    }],
    booking_start_date : {
        type : Date,
        required: true,
        default: Date.now 
    },
    booking_end_date : {
        type: Date,
        required: true
    },
    location : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'locations'
    },
    pickuptime : {
        type: TimeRanges,
        required : true
    },
    auto_pickup : {
        type : Boolean,
        default: true
    },
    pickup_cordinate : {
        long : {
            type : Number,
        },
        lat : {
            type : Number,
        },
    },
    createdon : {
        type: Date,
        default: Date.now 
    }
});
const booking = mongoose.model('booking', BookingSchema);
module.exports = booking;