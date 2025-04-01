const Company = require('../models/CompanyRegistration');
const User = require('../models/UserSchema');
const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');



exports.createCompany = async (req, res) => {
    try {
        const {
            companyDescription, companyName, companyPhoneNumber, companySize,
            fullName, industry, jobTitle, location, password, confirmPassword,
            companyEmail, phoneNumber, workEmail
        } = req.body;

        // Validate required fields dynamically
        const requiredFields = [
            "companyDescription", "companyName", "companyPhoneNumber", "companySize",
            "fullName", "industry", "jobTitle", "location", "password",
            "confirmPassword", "companyEmail", "phoneNumber", "workEmail"
        ];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Missing required field: ${field}` });
            }
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // File upload handling
        const profile = req.file ? `/uploads/profile-images/${req.file.filename}` : null;
        

        // Create new company instance
        const newCompany = new Company({
            companyDescription,
            companyName,
            companyPhoneNumber,
            companySize,
            fullName,
            industry,
            jobTitle,
            location,
            password: hashedPassword, 
            companyEmail,
            phoneNumber,
            workEmail,
            profile
        });

        // Save company to database
        const savedCompany = await newCompany.save();
        res.status(201).json(savedCompany);

    } catch (error) {
        console.error("Error in createCompany:", error);

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "An unexpected error occurred" });
    }
};




//get all companies registered in system
exports.getAllComapnies = async (req, res) => {
    try{
        const companies = await Company.find();
        res.status(200).json(companies);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}


//verfiy company and save user to db
exports.verifyCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        company.verified = true;
        await company.save();

        // Create new user account for login
        const newUser = new User({
            fullName: company.fullName,
            email: company.companyEmail,
            phoneNumber: company.companyPhoneNumber,
            password: company.password,
            role: "recruiter",
        });

        console.log("Attempting to save new user:", newUser);

        await newUser.save();
        
        console.log("User successfully added to the database!");

        return res.status(200).json({ 
            message: "Company verified successfully and user created",
            company: company
        });

    } catch (error) {
        console.error("Error in verifying company or saving user:", error);
        return res.status(500).json({ message: error.message });
    }
};


//get company by id
exports.getCompanyById = async (req, res) => {
    try{
        const company = await Company.findById(req.params.id);
        if(!company){
            return res.status(404).json({message: "Company not found"});
        }
        res.status(200).json(company);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}


//send confirmation email
exports.sendConfirmationEmail = async (req, res) => {

    const{companyEmail}=req.body;

    console.log(companyEmail);
    try{
        const company = await Company.findOne({companyEmail:companyEmail});

        if(!company){
            return res.status(404).json({message: "Company not found"});
        }

        //nodemailer to send email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER, 
              pass: process.env.EMAIL_PASSWORD
              
            },
          });

          const mailOptions = {
            from: '"HireEase" <smithdias3226@gmail.com>', 
            to: company.companyEmail,
            subject: "Company Registration Successfuly",
            html: `
              <body style="font-family: Arial, sans-serif; color: #333333; margin: 0; padding: 0;">
                <div style="background-color: #f9f9f9; padding: 20px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                    <tr>
                      <td align="center" style="padding: 40px 0; background-color: #ffffff;">
                        <img src="https://res.cloudinary.com/dmg6wra3t/image/upload/v1743093512/068b3c52-9266-4ac5-8372-a5c22b57d989_rqqjj4.png" alt="HireEase Logo" width="150" style="display: block;">
                        <h1 style="font-size: 24px; color: #4a90e2;">Company Registration Successful</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 20px; background-color: #ffffff;">
                        <p>Dear ${company.companyName},</p>
                        <p>Congratulations! Your company has been succesfully registered at HireEase.</p>
                        <p>You can now use our portal to seamless track applicants and manage hiring process.</p>
                        <p>We look forward to supporting your recruitment process!</p>
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
            .json({ message: "Email send successfully" });
        } catch (error) {
          console.error("Error sending confirmation mail:", error);
          return res
            .status(500)
            .json({ message: "Failed to send confirmation mail" });
        }
      }



//delete company
exports.deleteCompany =async (req, res) => {
    try{
        const company = await Company.findByIdAndDelete(req.params.id);
        if(!company){
            return res.status(404).json({message: "Company not found"});
        }
        res.status(200).json({message: "Company deleted successfully"});
    }catch(error){
        res.status(500).json({message: error.message});
    }

}




