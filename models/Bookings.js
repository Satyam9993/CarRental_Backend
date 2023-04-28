const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'booking'
    },
    carId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'booking'
    },
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
        // TODO: schema of Location is left
    },
    createdon : {
        type: Date,
        default: Date.now 
    }
});
const booking = mongoose.model('booking', BookingSchema);
module.exports = booking;