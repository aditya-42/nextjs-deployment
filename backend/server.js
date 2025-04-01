const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");  
const cookieParser = require("cookie-parser");
const path = require("path");



//routes
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobPostRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const companyRoutes = require("./routes/companyRoutes");

//auth middleware
const authMiddleware = require("./middleware/authMiddleware")


dotenv.config();
const app = express();


app.use(session({
  secret: process.env.JWT_SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));


app.use(cookieParser());

// middleware
app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//console.log(path.join(__dirname, "uploads", "1739765419618.jpg"));



app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));
app.use("/uploads/resumes", express.static("uploads/resumes"));
app.use("/uploads/profile-images", express.static("uploads/profile-images"));


//routes
app.use("/api/users", userRoutes);
app.use("/api/recruiter", jobRoutes);
app.use("/api/applicant", applicationRoutes);
app.use("/api/company", companyRoutes);

// mongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

connectDB();

//middleware
//error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ message: `Duplicate entry: ${field} already exists.` });
  }

  return res.status(500).json({ message: err.message || "Internal Server Error" });
});

// 404 Route Not Found
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});






const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
