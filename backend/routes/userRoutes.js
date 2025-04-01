const express = require('express');
const router = express.Router();
const multer = require('multer');

const path = require('path');
const userController = require('../controllers/UserController');

//middleware
// const authenticateUser = require("../middleware/authMiddleware")


//storing profile image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/profile-images/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });




  //routes
router.post('/create-users',upload.single('profile') , userController.createUser);
router.post('/login', userController.loginUser); //login user


// get current user
router.get('/me', userController.getUserProfile);

router.put('/update-user-profile/:id', upload.single('profile'), userController.updateUserAndProfile);


router.get('/get-users',userController.getUsers); //all users
router.get('/get-user/:email', userController.getUserByEmail); //get user by email
router.get('/get-user/:id' , userController.getUserById); //get single user by id
router.put('/update-user/:id', userController.updateUser); //update user by id
router.delete('/delete-user/:id',userController.deleteUser); //delete user by id

//logout user
router.post('/logout', userController.logoutUser);

router.put('/update-userData/:email' ,upload.single('profile'), userController.updateUserByEmail)

module.exports = router;


