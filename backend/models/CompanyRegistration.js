const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    jobTitle:{
        type: String,
        required: true,
    },
    workEmail:{
        type: String,
        required: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true,
    },
    companyName:{
        type: String,
        required: true,
    },
    companyEmail:{
        type: String,
        required: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        unique: true,
    },
    industry:{
        type: String,
        required: true,
    },
    companyDescription:{
        type: String,
        required: true,
    },
    companySize:{
        type: String,
        required: true,
    },
    companyPhoneNumber:{
        type: Number,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    confirmPassword:{
        type: String,
        required:false,
    },
    verified:{
        type: Boolean,
        default: false,
    },
    profile:{
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Company = mongoose.models.Company || mongoose.model('CompanyDetails', companySchema);

module.exports = Company;

    
   

   


  


