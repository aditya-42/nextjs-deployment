const express = require('express');
const router = express.Router();

const path = require('path');
const jobPostController = require('../controllers/JobPostController');


//job posting route
router.post('/create-job-post', jobPostController.createJobPost); 

//getting all jobs
router.get('/getAlljobs', jobPostController.getJobPosts);

//get single job listing
router.get('/get-job-post/:id', jobPostController.getJobPostById);

//delete job listing
router.delete('/delete-job-post/:id', jobPostController.deleteJobPost);

//update job listing
router.put('/update-job-post/:id', jobPostController.updateJobPost);



module.exports = router;