const JobPost = require("../models/JobPostSchema");

// Create a new job post
const createJobPost = async (req, res) => {
  console.log("Creating job post");
  
  const {
    jobTitle,
    employmentType,
    jobDescription,
    location,
    salaryRangeMin,
    salaryRangeMax,
    requirements,
    skills,
    applicationDeadline,
    companyOverview,
    benefits,
    contactEmail
  } = req.body;

  //console.log("Typed details are:", req.body);

  // Validation
  if (!jobTitle || !employmentType || !jobDescription || !location || 
      !salaryRangeMin || !salaryRangeMax || !requirements || !skills || 
      !applicationDeadline || !companyOverview || !benefits || !contactEmail) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Convert skills to an array if it's a comma-separated string
  const skillsArray = Array.isArray(skills) ? skills : skills.split(",").map((skill) => skill.trim());

  // Create a new job post with validated data
  const jobPost = new JobPost({
    jobTitle,
    employmentType,
    jobDescription,
    location,
    salaryRangeMin,
    salaryRangeMax,
    requirements,
    skills: skillsArray,
    applicationDeadline,
    companyOverview,
    benefits,
    contactEmail,
  });

  // Save to database
  try {
    const savedJobPost = await jobPost.save();
    res.status(201).json({ message: "Job posted successfully", savedJobPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//getting all jobs
const getJobPosts = async (req, res) => {
  try {
    // if(!req.user || !req.user.id) {
    //   return res.status(401).json({ message: "Unauthorized: No recruiter ID found" });
    // }
    
   
    const jobPosts = await JobPost.find();
    //console.log("Got all the jobs", jobPosts);
    res.status(200).json(jobPosts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//geting job post by id
const getJobPostById = async (req, res, next) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);
    if (!jobPost) return res.status(404).json({ message: 'Job post not found' });
    res.status(200).json(jobPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//update job post
const updateJobPost = async (req, res, next) => {
  try {
    const updatedJobPost = await JobPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJobPost) return res.status(404).json({ message: 'Job post not found' });
    res.status(200).json(updatedJobPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//delete job post
const deleteJobPost = async (req, res, next) => {
  try {
    console.log("Inside delete")
    console.log("Inside delete, jobId:", req.params.id);
    const deletedJobPost = await JobPost.findByIdAndDelete(req.params.id);
    if (!deletedJobPost) return res.status(404).json({ message: 'Job post not found' });
    res.status(200).json({ message: 'Job post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createJobPost , getJobPosts , updateJobPost  , getJobPostById ,  deleteJobPost};
