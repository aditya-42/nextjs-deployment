import React from 'react';

interface ApplicantScoreProps {
  score: number;
}

const ApplicantScore: React.FC<ApplicantScoreProps> = ({ score }) => {
  const getScoreDescription = (score: number) => {
    if (score >= 4) return "High";
    if (score >= 3) return "Good";
    if (score >= 2) return "Average";
    return "Review";
  };

  const scoreColorClass = (score: number) => {
    if (score >= 4) return "text-green-500";
    if (score >= 3) return "text-blue-500";
    if (score >= 2) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`font-semibold ${scoreColorClass(score)}`}>
        {score.toFixed(1)}
      </div>
      <div className="text-xs text-gray-500">
        {getScoreDescription(score)}
      </div>
    </div>
  );
};

export default ApplicantScore;
