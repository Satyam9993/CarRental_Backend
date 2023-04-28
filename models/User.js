const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        require : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    emailVerify : {
        type: Boolean,
        default : false
    },
    password : {
        type: String,
        required: true,
    },
    otp:{
        type: Number
    },
    profilephoto:{
        type : "String",
        default : "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png",
    },
    active_booking:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'booking'
    }],
    passed_booking:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'booking'
    }],
    createdon : {
        type: Date,
        default: Date.now 
    }
});
const user = mongoose.model('user', UserSchema);
module.exports = user;