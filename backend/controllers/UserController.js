const express = require('express');

const path = require('path');

const User = require('../models/UserSchema');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');



dotenv.config();



// Registering User user controller
const createUser = async (req, res) => {
  const { fullName, email, phoneNumber, password, role } = req.body;
  //file upload
  const profile = req.file ? req.file.path : null; 
  console.log("Profile photo" , profile);

  // console.log({ fullName, email, phoneNumber, password, role, profile } , "Details of the user");


  try {
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password,
      role,
      profile, 
    });

    if(!req.body.password){
      newUser.isOAuthUser = true;
    }else{
    //hash password before saving
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    }

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log("user created" , savedUser)


  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error saving user - from controller" , error)
  }
};


//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("genreated token" , token)

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//logout user
  const logoutUser = (req, res) => {
    res.clearCookie("next-auth.session-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.json({ message: "Logout successful" });
  };
  





// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update email through email
const updateUserByEmail = async (req, res) => {
  const { email } = req.params;
  const updatedData = req.body;

  console.log("Updated data" , updatedData);
  console.log("Profile photo received:", req.file ? req.file.path : "No file uploaded");

  const profile = req.file ? req.file.path : null; 
  console.log("Profile photo" , profile);

  try {
    const updateFields = {
      fullName: updatedData.name,
      email: updatedData.email,
      phoneNumber: updatedData.phoneNumber,
      skills: updatedData.skills ? JSON.parse(updatedData.skills) : [],
      bio: updatedData.bio,
    };
     // update profile if new photo uploaded
     if (req.file) {
      updateFields.profile = req.file.path;  
    }

    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: updateFields },
      { new: true } 
    );  

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: error.message });
  }
};

    







  


// Update user by ID
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single user by email
const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const getUserProfile = async (req, res) => {
  try {
    const userId = req.query.id;

    // fix undefined issues
    if (!userId || userId === "undefined" || userId.trim() === "") {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user._id,
      fullName: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile ? user.profile.replace(/\\/g, "/") : "",
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





const updateUserAndProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const updatedData = {};
    
    if (req.body.fullName) {
      updatedData.fullName = req.body.fullName;
    }

    if (req.file) {
      updatedData.profile = `/uploads/profile-images/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({
      id: updatedUser._id,
      fullName: updatedUser.fullName, 
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      role: updatedUser.role,
      profile: updatedUser.profile,
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};





module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile, 
  updateUserAndProfile,
  updateUserByEmail,
  logoutUser,
  getUserByEmail
};
