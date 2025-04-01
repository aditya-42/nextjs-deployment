interface Applicant {
    _id: string;
    fullName: string;
    highestEducation: string;
    education: string;
    yearsOfExperience: number | string;
    prevJobTitle?: string;
    portfolioURL?: string;
    linkedProfile?: string;
}

export function calculateApplicantScores(applicants: Applicant[]): { _id: string, score: number }[] {
    if (!Array.isArray(applicants) || applicants.length === 0) {
        console.error("No applicant data provided or invalid data format");
        return [];
    }

    return applicants.map(applicant => {
        let score = 0;
        const scoreBreakdown = {
            education: 0,
            experience: 0,
            relevantTitle: 0,
            portfolio: 0,
            linkedin: 0,
            skills: 0
        };

        // Education score
        const educationScore: Record<string, number> = {
            "High School": 0.2,
            "Bachelors": 0.6,
            "Bachelor's": 0.6,
            "Masters": 0.8,
            "Master's": 0.8,
            "PhD": 1,
            "BE": 0.6,
            "BA": 0.6,
            "Doctorate": 1,
            "N/A": 0.1
        };

        if (applicant.highestEducation === "N/A" && applicant.education === "BE") {
            scoreBreakdown.education = educationScore["BE"];
        } else {
            scoreBreakdown.education = educationScore[applicant.highestEducation] || educationScore[applicant.education] || 0;
        }
        score += scoreBreakdown.education;

        // Experience score
        const years = typeof applicant.yearsOfExperience === 'number' 
            ? applicant.yearsOfExperience 
            : parseInt(applicant.yearsOfExperience) || 0;
        scoreBreakdown.experience = Math.min(years / 5, 1);
        score += scoreBreakdown.experience;

        // Job title
        const relevantTitles = [
            'software engineer', 
            'web developer', 
            'frontend developer',
            'full stack developer',
            'backend developer',
            'product manager',
            'devops'
        ];
        const cleanTitle = applicant.prevJobTitle?.toLowerCase().trim() || '';
        scoreBreakdown.relevantTitle = relevantTitles.some(title => cleanTitle.includes(title)) ? 1 : 0;
        score += scoreBreakdown.relevantTitle;

        // Portfolio URL
        const portfolioURL = applicant.portfolioURL || applicant.porfolioURL;
        scoreBreakdown.portfolio = portfolioURL && portfolioURL !== "N/A" && portfolioURL.startsWith('http') ? 0.5 : 0;
        score += scoreBreakdown.portfolio;

        // LinkedIn
        scoreBreakdown.linkedin = applicant.linkedProfile?.includes?.('linkedin.com') ? 0.5 : 0;
        score += scoreBreakdown.linkedin;

        const maxPossibleScore = 4;
        const scaledScore = (score / maxPossibleScore) * 5;
        const finalScore = Math.min(Math.max(Number(scaledScore.toFixed(1)), 0), 5);

        return { 
            _id: applicant._id,
            score: finalScore 
        };
    });
}
