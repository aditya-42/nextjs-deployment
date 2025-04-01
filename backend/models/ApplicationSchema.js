const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
   fullName:{
     type: String,
     required: true
   },
   email:{
     type: String,
     required: true
   },
   phoneNumber:{
     type: Number,
     required: true
   },
   appliedJobRole:{
     type: String,
     default:'N/A',
   },
   education:{
     type: String,
     required: true
   },
   highestEducation:{
     type: String,
     required: true
   },
   yearsOfExperience:{
     type: Number,
     required: true
   },
   skills:{
     type: [String],
     required: true
   },
   prevJobTitle:{
     type: String,
     required: true
   },
   prevCompanyName:{
     type: String,
     default: 'N/A',
   },
   prevSalary:{
     type: Number,
     default: 0,
   },
   uploadResume:{
     type: String,
     required: true
   },
   linkedProfile:{
     type: String,
     required: false
   },
   porfolioURL:{
     type: String,
     default: 'N/A',
     required: false
   },
   appliedOn:{
     type: Date,
     default: Date.now,  
   },
   status:{
     type: String,
     enum: ['PENDING', 'REJECTED', 'SELECTED'],
     default: 'PENDING'
   },
    createdAt: {
      type: Date,
      default: Date.now
  }
   
   
});

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

module.exports = Application;