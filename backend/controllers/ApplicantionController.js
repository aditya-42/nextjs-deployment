const Application = require("../models/ApplicationSchema");
const nodemailer = require('nodemailer');


exports.submitApplication = async (req, res, next) => {
  try {
    console.log("Received Form Data:", req.body);
    console.log("Received File:", req.file);

    const appliedJobRole = req.body.appliedJobRole;
    console.log("Received appliedRole", appliedJobRole);

    if (!req.file) {
      console.log("No resume uploaded -- inside controller");
      return res.status(400).json({ message: "No resume uploaded" });
    }

    const {
      name: fullName,
      email,
      phone: phoneNumber,
      education,
      experience: yearsOfExperience,
      skills,
      prevJobTitle,
      prevCompany: prevCompanyName,
      prevSalary,
      linkedIn: linkedProfile,
      portfolio: portfolioURL,
    } = req.body;

    // Validation
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !education ||
      !yearsOfExperience ||
      !skills ||
      !prevJobTitle ||
      !prevCompanyName ||
      !prevSalary ||
      !req.file
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // resume file path
    const resumePath = req.file.path;

    // create new application
    const newApplication = new Application({
      fullName,
      email,
      phoneNumber,
      education,
      highestEducation: "N/A",
      yearsOfExperience,
      skills,
      prevJobTitle,
      prevCompanyName,
      prevSalary,
      uploadResume: resumePath,
      linkedProfile,
      portfolioURL,
      appliedJobRole,
    });

    try {
      const savedApplication = await newApplication.save();
      console.log("Application submitted successfully:", savedApplication);
      res
        .status(201)
        .json({
          message: "Application submitted successfully",
          savedApplication,
        });
    } catch (error) {
      console.error("Error saving application:", error.message);
      res
        .status(500)
        .json({ message: "Error saving application", error: error.message });
    }
  } catch (error) {
    console.error("Unexpected server error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//get all applications for that user
exports.getAllApplications = async (req, res) => {
  const email = req.params.email;

  console.log("Getting all applications for the user", email);

  try {
    const applications = await Application.find({ email: email });

    if (!applications || applications.length === 0) {
      //return res.status(404).json({ message: "No applications found for this email" });
      return res
        .status(200)
        .json({ message: "No applications found for this email" });
    }

    res.status(200).json(applications);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching applications", error: err });
  }
};

//get all applciants data
exports.getAllApplicantDetails = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applicants", error: err });
  }
};

//get applicants details by id
exports.getApplicantDetailsById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res
        .status(404)
        .json({ message: "No application found with this id" });
    }
    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ message: "Error fetching application", error: err });
  }
};

//delete applicant
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res
        .status(404)
        .json({ message: "No application found with this id" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting application", error: err });
  }
};

exports.updateApplicatStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    //get the applicant
    const updatedApplicant = await Application.findByIdAndUpdate(
      id,
      { status: status.toUpperCase() },
      { new: true, runValidators: true }
    );

    if (!updatedApplicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res
      .status(200)
      .json({
        message: "Applicant status updated successfully",
        applicant: updatedApplicant,
      });
  } catch (error) {
    console.error("Error updating applicant status:", error);
    res
      .status(500)
      .json({
        message: "Error updating applicant status",
        error: error.message,
      });
  }
};

//send interview link to the applicant
exports.sendInterviewLink = async (req, res) => {
    //console.log("I am insde the confirmation")
  const { email , meetingLink} = req.body;

  try {
    const applicant = await Application.findOne({email:email});

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    //nodemailer to send the link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD
        
      },
    });

    const mailOptions = {
      from: '"HireEase" <smithdias3226@gmail.com>', 
      to: applicant.email,
      subject: "Interview Invitation from HireEase",
      html: `
        <body style="font-family: Arial, sans-serif; color: #333333; margin: 0; padding: 0;">
          <div style="background-color: #f9f9f9; padding: 20px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 0; background-color: #ffffff;">
                  <img src="https://res.cloudinary.com/dmg6wra3t/image/upload/v1743093512/068b3c52-9266-4ac5-8372-a5c22b57d989_rqqjj4.png" alt="HireEase Logo" width="150" style="display: block;">
                  <h1 style="font-size: 24px; color: #4a90e2;">Interview Invitation</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; background-color: #ffffff;">
                  <p>Dear ${applicant.fullName},</p>
                  <p>We are pleased to invite you to an interview for the ${applicant.appliedJobRole} position at HireEase.</p>
                  <p>Please use the following link to join the interview:</p>
                  <p style="margin-bottom: 20px;"><a href="${meetingLink}" style="color: #4a90e2; text-decoration: none;">${meetingLink}</a></p>
                  <p>We look forward to meeting you!</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; background-color: #4a90e2; color: #ffffff; text-align: center;">
                  <p>&copy; ${new Date().getFullYear()} HireEase. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </div>
        </body>
      `,
    };
    

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Interview link sent successfully" });
  } catch (error) {
    console.error("Error sending interview link:", error);
    return res
      .status(500)
      .json({ message: "Failed to send the interview link" });
  }
}


  exports.sendConfirmationEmail = async (req, res) => {

    console.log("In this endpoint")
   
  const { email } = req.body;

  console.log("I am here and the email is " , email)

  try {
    const applicant = await Application.findOne({email:email});

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    //nodemailer to send the link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD
        
      },
    });

    const mailOptions = {
      from: '"HireEase" <smithdias3226@gmail.com>', 
      to: applicant.email,
      subject: "Confirmation of Application",
      html: `
        <body style="font-family: Arial, sans-serif; color: #333333; margin: 0; padding: 0;">
          <div style="background-color: #f9f9f9; padding: 20px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 0; background-color: #ffffff;">
                  <img src="https://res.cloudinary.com/dmg6wra3t/image/upload/v1743093512/068b3c52-9266-4ac5-8372-a5c22b57d989_rqqjj4.png" alt="HireEase Logo" width="150" style="display: block;">
                  <h1 style="font-size: 24px; color: #4a90e2;">Confirmation of Application</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; background-color: #ffffff;">
                  <p>Dear ${applicant.fullName},</p>
                  <p>We have received your application for  ${applicant.appliedJobRole} position at HireEase.</p>
                  <p>One of our hiring manager will be in touch with you if your application is selected!</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; background-color: #4a90e2; color: #ffffff; text-align: center;">
                  <p>&copy; ${new Date().getFullYear()} HireEase. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </div>
        </body>
      `,
    };
    

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Confirmation sent successfully" });
  } catch (error) {
    console.error("Error sending confirmation:", error);
    return res
      .status(500)
      .json({ message: "Failed to send confirmation" });
  }

async function createGoogleMeetLink(applicantEmail, startTime, endTime) {
  try {
      const event = {
          summary: 'Interview with HireEase',
          description: 'Interview for the applicant.',
          start: {
              dateTime: startTime, // e.g., '2025-03-15T09:00:00-07:00'
              timeZone: 'America/New_York',
          },
          end: {
              dateTime: endTime, // e.g., '2025-03-15T10:00:00-07:00'
              timeZone: 'America/New_York',
          },
          attendees: [{ email: applicantEmail }],
          conferenceData: {
              createRequest: {
                  requestId: Math.random().toString(36).substring(2, 15), // Unique ID
              },
          },
      };

      const request = {
          calendarId: 'primary',
          resource: event,
          conferenceDataVersion: 1,
      };

      const response = await calendar.events.insert(request);
      console.log('Meeting created:', response.data);

      return response.data.hangoutLink; // Returns the Google Meet link
  } catch (error) {
      console.error('Error creating Google Meet:', error);
      throw new Error('Failed to create Google Meet');
  }
}
}

