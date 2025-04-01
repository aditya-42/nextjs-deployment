import React, { useState } from "react";
import { Briefcase, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button"; 

interface Job {
  id: number;
  title: string;
  skills: string[];
  description: string;
  postedDate: string;
}

const jobs: Job[] = [
  { id: 1, title: "Frontend Developer", skills: ["React", "TypeScript", "Tailwind CSS"], description: "We are looking for a skilled Frontend Developer with experience in React.", postedDate: "Feb 14, 2025" },
  { id: 2, title: "Backend Engineer", skills: ["Node.js", "Express", "MongoDB"], description: "Seeking an experienced Backend Engineer to build scalable APIs and microservices.", postedDate: "Feb 12, 2025" },
  { id: 3, title: "UI/UX Designer", skills: ["Figma", "Adobe XD", "Wireframing"], description: "Looking for a creative UI/UX Designer to craft modern and intuitive designs.", postedDate: "Feb 10, 2025" },
  { id: 4, title: "DevOps Engineer", skills: ["AWS", "Docker", "Kubernetes"], description: "Hiring a DevOps Engineer with experience in cloud platforms.", postedDate: "Feb 8, 2025" },
  { id: 5, title: "Data Scientist", skills: ["Python", "Machine Learning", "SQL"], description: "Seeking a Data Scientist to analyze and visualize large datasets.", postedDate: "Feb 7, 2025" },
  { id: 6, title: "Mobile Developer", skills: ["Flutter", "Dart", "Firebase"], description: "Looking for a Mobile Developer to build cross-platform applications.", postedDate: "Feb 6, 2025" },
  { id: 7, title: "Cybersecurity Analyst", skills: ["Security", "Penetration Testing", "SIEM"], description: "Join our cybersecurity team to protect digital assets.", postedDate: "Feb 5, 2025" },
  { id: 8, title: "AI Engineer", skills: ["Deep Learning", "TensorFlow", "NLP"], description: "Develop cutting-edge AI solutions for various applications.", postedDate: "Feb 4, 2025" },
];

const LatestJobs: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Get jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-gray-800 text-center">Latest Job Openings</h2>
      <p className="text-gray-500 text-center mt-2">Explore top job opportunities and apply today!</p>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {currentJobs.map((job) => (
          <div key={job.id} className="bg-white shadow-lg p-5 rounded-2xl border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col gap-3 h-full">
            <div className="flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-[#6A38C2]" />
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              Posted: {job.postedDate}
            </div>

            {/* Skills with green background */}
            <div className="flex flex-wrap gap-2 mt-2">
              {job.skills.map((skill, index) => (
                <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>

            <p className="mt-2 text-gray-600 flex-grow">{job.description}</p> 

            {/* Apply button stays aligned */}
            <Button className="mt-auto rounded-full bg-[#6A38C2] text-white hover:bg-[#5a2cbf] transition">
              Apply Now
            </Button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-full bg-gray-100 text-gray-700 disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 border rounded-full ${currentPage === i + 1 ? "bg-[#6A38C2] text-white" : "bg-gray-100 text-gray-700"}`}
          >
            {i + 1}
          </button>
        ))}

        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-full bg-gray-100 text-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LatestJobs;
