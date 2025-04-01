"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from "../../../components/shared/Navbar";
import Footer from '@/components/shared/Footer';



import ApplyModal from '@/components/ApplyModal/page';

export interface Job {
    _id: string;
    jobTitle: string;
    employmentType: string;
    jobDescription: string;
    location: string;
    salaryRangeMin: number;
    salaryRangeMax: number;
    requirements: string;
    skills: string[];
    applicationDeadline: string;
    companyOverview: string;
    benefits: string;
    contactEmail: string;
    companyName: string;
    datePosted: string;
}

const JobDetails: React.FC = () => {
    console.log("I am inside job details page");

    const params = useParams();
    const router = useRouter();
    const [job, setJob] = useState<Job | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    //state to check modal is open or close
    const [isModalOpen, setIsModelOpen] = useState(false);

    const handleOpenModal = () => setIsModelOpen(true);
    const handleCloseModal = () => setIsModelOpen(false);


    //get user from localstorage
    const user = localStorage.getItem('user');
    

    //fetch job details from backend

    useEffect(() => {
        const fetchJobDetails = async () => {
            const id = params.id as string;
            if (id) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recruiter/get-job-post/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setJob(data as Job);
                } catch (error) {
                    console.error("Error fetching job details:", error);
                    setError("Failed to fetch job details. Please try again later.");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchJobDetails();
    }, [params.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!job) {
        return <div>No job details found.</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-3xl mx-auto">

                    {/* Job Title & Pay */}
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{job.jobTitle}</h2>

                    <div className="text-lg text-gray-700 font-semibold mb-4">💰 Pay: From ${job.salaryRangeMin} - ${job.salaryRangeMax} </div>

                    {/* Job Type & Location */}
                    <div className="border-t border-gray-300 pt-4 mb-4">
                        <p className="text-gray-700"><span className="font-semibold">📌 Job Type:</span> {job.employmentType}</p>
                        <p className="text-gray-700"><span className="font-semibold">📍 Location:</span> {job.location}</p>
                        <p className="text-gray-700"><span className="font-semibold">🗓️ Application Deadline:</span> {new Date(job.applicationDeadline).toLocaleDateString('en-GB')}</p>
                    </div>

                    {/* Job Description */}
                    <div className="border-t border-gray-300 pt-4 mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Full Job Description</h3>
                        <p className="text-gray-600 leading-relaxed">{job.jobDescription}</p>
                    </div>

                    {/* Responsibilities */}
                    <div className="border-t border-gray-300 pt-4 mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Responsibilities</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            {job.requirements}
                        </ul>
                    </div>

                    {/* Qualifications */}
                    <div className="border-t border-gray-300 pt-4 mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Skills Required</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            {job.skills.map((skill, index) => (
                                <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                                    {skill}
                                </span>
                            ))}
                        </ul>
                    </div>

                    {/* Benefits */}
                    <div className="border-t border-gray-300 pt-4 mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Benefits</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            {job.benefits}
                        </ul>
                    </div>



                    {/* Apply & Back Buttons */}
                    <div className="flex space-x-4 mb-4">
                        {user? (
                            <button onClick={handleOpenModal} className="bg-[#6A38C2] hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition">
                                Apply Now
                            </button>
                        ) : (
                            <button 
                            onClick={() => alert('Please sign in to apply.')} 
                            className="bg-gray-300 text-gray-600 font-medium py-2 px-6 rounded transition cursor-not-allowed"
                            disabled>
                            Apply Now (Please Sign In)
                        </button>
                        )}
                    </div>


                    {/* //modal opening  */}
                    {isModalOpen && <ApplyModal closeModal={handleCloseModal} jobTitle={job.jobTitle} />}


                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded transition"
                        onClick={() => router.back()}>
                        Back to Job Board
                    </button>
                </div>

            </div>
        


            <Footer />
        </>
    );
};

export default JobDetails;
