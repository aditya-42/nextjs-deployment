const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    employmentType: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salaryRangeMin: {
        type: Number,
        required: true,
    },
    salaryRangeMax: {
        type: Number,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    applicationDeadline: {
        type: Date,
        required: true,
    },
    companyOverview: {
        type: String,
        required: true,
    },
    benefits: {
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
        default: "Google"
    },
    datePosted: {
        type: Date,
        default: Date.now, 
    },
   
});

const JobPost = mongoose.models.JobPost || mongoose.model('JobPost', jobPostSchema);

module.exports = JobPost;
