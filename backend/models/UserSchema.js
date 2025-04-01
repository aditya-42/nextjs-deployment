const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    phoneNumber: {
        type:String,
        required: false,
        default: null
       
    },
    password:{
        type: String,
    },
    role: {
        type: String,
        enum: ['applicant', 'recruiter'],
        default: 'applicant'
    },
    profile:{
        type: String,
        required:false,
    },
    summary:{
        type:String,
        required:false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;



