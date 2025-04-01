const Applicant = require("../models/ApplicationSchema");

exports.applicantDashboard = async (req, res) => {
  try {
    // 1. Total Applicants
    const totalApplicants = await Applicant.countDocuments();

    // 2. Applications per Job Role
    const applicationsByJob = await Applicant.aggregate([
      { $group: { _id: "$appliedJobRole", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // 3. Applicants by Experience
    const applicantsByExperience = await Applicant.aggregate([
      { $group: { _id: "$yearsOfExperience", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // 4. Monthly Applications
    const monthlyApplications = await Applicant.aggregate([
      { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
      { $project: { 
        _id: 0, 
        month: { $concat: ["Month ", { $toString: "$_id" }] }, 
        count: 1 
      }}
    ]);

    // 5. Skills Analysis
    const skillsAnalysis = await Applicant.aggregate([
      { $unwind: "$skills" },
      { $group: { _id: "$skills", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // 6. Education Level Distribution
    const educationDistribution = await Applicant.aggregate([
      { $group: { _id: "$highestEducation", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // 7. Application Status Overview
    const applicationStatus = await Applicant.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // 8. Source of Applications
    const applicationSource = await Applicant.aggregate([
      { $group: { 
        _id: null, 
        totalApplicants: { $sum: 1 },
        withLinkedIn: { $sum: { $cond: [{ $ne: ["$linkedProfile", ""] }, 1, 0] } },
        withPortfolio: { $sum: { $cond: [{ $ne: ["$portfolioURL", ""] }, 1, 0] } }
      } },
      { $project: {
        _id: 0,
        totalApplicants: 1,
        linkedInPercentage: { 
          $round: [{ $multiply: [{ $divide: ["$withLinkedIn", "$totalApplicants"] }, 100] }, 2]
        },
        portfolioPercentage: { 
          $round: [{ $multiply: [{ $divide: ["$withPortfolio", "$totalApplicants"] }, 100] }, 2]
        }
      } }
    ]);

    // 9. Average Years of Experience
    const averageExperience = await Applicant.aggregate([
      { $group: { 
        _id: null, 
        avgExperience: { $avg: { $toInt: "$yearsOfExperience" } } 
      } },
      { $project: { _id: 0, avgExperience: { $round: ["$avgExperience", 1] } } }
    ]);

    // 10. Top Previous Companies
    const topPreviousCompanies = await Applicant.aggregate([
      { $group: { _id: "$prevCompanyName", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalApplicants,
      applicationsByJob: applicationsByJob.map(item => ({ jobRole: item._id, count: item.count })),
      applicantsByExperience: applicantsByExperience.map(item => ({ experienceLevel: item._id, count: item.count })),
      monthlyApplications,
      topSkills: skillsAnalysis.map(item => ({ skill: item._id, count: item.count })),
      educationDistribution: educationDistribution.map(item => ({ education: item._id, count: item.count })),
      applicationStatus: applicationStatus.map(item => ({ status: item._id, count: item.count })),
      applicationSource: applicationSource[0],
      averageExperience: averageExperience[0],
      topPreviousCompanies: topPreviousCompanies.map(item => ({ company: item._id, count: item.count }))
    });

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Server error" });
  }
};
