const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const companyController = require('../controllers/CompanyController');

// Create Uploads Directory
const uploadDir = "uploads/profile-images/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// create company
router.post('/create-company', upload.single('profile'), companyController.createCompany);

// get company details
router.get('/get-companies', companyController.getAllComapnies);

// verify comoany
router.put('/verify-company/:id', companyController.verifyCompany);

// get company details by id
router.get('/get-company/:id', companyController.getCompanyById);

//send confirmation email
router.post('/send-confirmation-email', companyController.sendConfirmationEmail);

//delelte company
router.delete('/delete-company/:id', companyController.deleteCompany);


module.exports = router;
