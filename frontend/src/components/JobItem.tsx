"use client"
import React from "react";

type JobItemProps = {
  job: {
    id: string;
    role: string;
    company: string;
    appliedOn: string;
    status: string;
  };
};

const JobItem = ({ job }: JobItemProps) => {
  
  let statusClass = "";

 
  if (job.status === "PENDING") {
    statusClass = "bg-yellow-500 text-black"; 
  } else if (job.status === "SELECTED") {
    statusClass = "bg-green-500 text-black"; 
  } else if (job.status === "REJECTED") {
    statusClass = "bg-red-500 text-white"; 
  }

  return (
    <tr className="border-b border-gray-300">
      <td className="px-4 py-4">{new Date(job.appliedOn).toLocaleDateString()}</td>
      <td className="px-4 py-4">{job.prevJobTitle}</td>
      <td className="px-4 py-4">{job.prevCompanyName}</td>
      <td className="px-4 py-2">
        <span className={`inline-block px-4 py-2 ${statusClass} rounded-full min-w-[100px] text-center text-white`}>
          {job.status}
        </span>
      </td>
    </tr>
  );
  
}

export default JobItem;
