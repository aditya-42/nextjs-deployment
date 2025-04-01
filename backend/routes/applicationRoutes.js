const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const applicationController = require('../controllers/ApplicantionController');

const dashboardController = require('../controllers/DashboardController')


console.log(applicationController.getAllApplications);
//storing resume -- profile files into folders
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/resumes/");
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.originalname}`;
      cb(null, fileName);
    },
  });


const upload = multer({ storage: storage });
//routes

//get all applicatins details
router.get('/applications/:email', applicationController.getAllApplications);

//get all applicants data 
router.get('/get-applicants', applicationController.getAllApplicantDetails);

//get single applicant details
router.get('/get-applicant-details/:id', applicationController.getApplicantDetailsById);

//route to apply for job
router.post('/apply' , upload.single('resume') , applicationController.submitApplication);

//delete applicant details
router.delete('/delete-applicant/:id', applicationController.deleteApplication);

//update applicant status
router.put('/update-applicant-status/:id' , applicationController.updateApplicatStatus)

//send interview link
router.post('/send-interview-link' , applicationController.sendInterviewLink)

//send confirmation link
router.post('/send-confirmation' , applicationController.sendConfirmationEmail)

router.get('/get-reports' , dashboardController.applicantDashboard)


module.exports = router;