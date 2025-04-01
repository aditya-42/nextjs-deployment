"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaLinkedin, FaGlobe, FaFileAlt, FaArrowLeft } from 'react-icons/fa';
import Navbar from '@/components/shared/Navbar';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Link2 } from 'lucide-react';


export type Applicant = {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    appliedJobRole: string;
    education: string;
    highestEducation: string;
    yearsOfExperience: string;
    skills: string[];
    prevJobTitle: string;
    prevCompanyName: string;
    prevSalary: string;
    uploadResume: string;
    linkedProfile: string;
    portfolioURL: string;
    status: string;
};

const ApplicantDetails = () => {
    const [status, setStatus] = useState('');
    const [applicant, setApplicant] = useState<Applicant | null>(null);
    const { id } = useParams();

    const router = useRouter();


    //meeting link
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [meetingLink, setMeetingLink] = useState("")


    //api to get the applicant details
    useEffect(() => {
        if (id) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applicant/get-applicant-details/${id}`)
                .then(res => res.json())
                .then(data => {
                    // console.log("LinkedIn:", data.linkedProfile);
                    // console.log("Portfolio:", data.portfolioURL);
                    // console.log("Resume:", data.uploadResume);
                    // console.log("Details page", data)
                    setApplicant(data);
                    setStatus(data.status);
                })
                .catch(err => console.error('Error fetching applicant data:', err));
        }
    }, [id]);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };

    const handleSaveChanges = async () => {
        if (applicant) {
            try {
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/applicant/update-applicant-status/${id}`, { status: status.toUpperCase() });
                alert('Status updated successfully!');
            } catch (error) {
                console.error('Error updating status:', error);
                alert('Failed to update status.');
            }
        }
    }


    const handleMeeting=()=>{
        setIsModalOpen(true);
    }

    const sendMeetingLink = async () => {
        if (applicant) {
            try {

             
                // Make an API call to send the email with the meeting link
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/applicant/send-interview-link`, {
                    email: applicant.email,
                    meetingLink: meetingLink,
                });

                console.log(response)

                if (response.status === 200) {
                    alert('Interview link sent successfully!');
                } else {
                    alert('Failed to send interview link.');
                }

                setIsModalOpen(false);
            } catch (error) {
                console.error('Error sending interview link:', error.response.data);
                console.error(error.response.status)
                alert('Failed to send interview link.');
            }
        } else {
            alert('Please enter a valid meeting link.');
        }
    };














    if (!applicant) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <>
            <Navbar />
            {/* //back button */}

            <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10 space-y-8">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-indigo-600 rounded-full hover:bg-gray-200 transition-all duration-300"
                    onClick={() => router.push('/recruiter-portal/getAllJobs')}
                >
                    <FaArrowLeft />
                    <span>Back to Applicants</span>
                </button>
                <div className="border-b pb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-indigo-600">{applicant.fullName}</h1>
                        <p className="text-xl text-gray-600">{applicant.appliedJobRole}</p>

                        <h3
                            className={`
            px-3 py-1 rounded-lg font-semibold text-white 
            ${status === "SELECTED" ? "bg-green-500" :
                                    status === "REJECTED" ? "bg-red-500" :
                                        "bg-orange-500"}
        `}
                        >
                            {status}
                        </h3>
                    </div>

                    <h2 className="flex items-center" onClick={handleMeeting}>
                        <Link2 className="w-5 h-5 mr-2" />
                        Send Interview Link
                    </h2>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoSection title="Contact Information" bgColor="bg-blue-50">
                        <InfoItem label="Email" value={applicant.email} />
                        <InfoItem label="Phone" value={applicant.phoneNumber} />
                    </InfoSection>

                    <InfoSection title="Education" bgColor="bg-green-50">
                        <InfoItem label="Highest Education" value={applicant.highestEducation} />
                        <InfoItem label="Education Details" value={applicant.education} />
                    </InfoSection>

                    <InfoSection title="Experience" bgColor="bg-yellow-50">
                        <InfoItem label="Years of Experience" value={applicant.yearsOfExperience} />
                        <InfoItem label="Previous Job Title" value={applicant.prevJobTitle} />
                        <InfoItem label="Previous Company" value={applicant.prevCompanyName} />
                        <InfoItem label="Previous Salary" value={applicant.prevSalary} />
                    </InfoSection>

                    <InfoSection title="Skills" bgColor="bg-purple-50">
                        <div className="flex flex-wrap gap-2">
                            {applicant.skills.map((skill, index) => (
                                <span key={index} className="bg-indigo-200 text-indigo-800 px-2 py-1 rounded-full text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </InfoSection>
                </div>

                <div className="flex flex-wrap gap-4 mt-6">
                    <LinkButton href={applicant.linkedProfile} icon={<FaLinkedin />} text="LinkedIn" />
                    <LinkButton href={applicant.portfolioURL} icon={<FaGlobe />} text="Portfolio" />
                    <LinkButton
                        href={`http://localhost:5001/${applicant.uploadResume}`}
                        icon={<FaFileAlt />}
                        text="Resume"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            e.preventDefault();
                            window.open(`http://localhost:5001/${applicant.uploadResume}`, '_blank', 'noopener,noreferrer');
                        }}
                    />

                </div>


{/* //modal  */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                            <h3 className="text-xl font-semibold mb-4">Enter Interview Link</h3>
                            <input
                                type="text"
                                className="mb-4 p-2 border rounded-md w-full"
                                placeholder="Enter Meeting Link"
                                value={meetingLink}
                                onChange={(e) => setMeetingLink(e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={sendMeetingLink}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                >
                                    Send Interview Link
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                <div className="mt-8 border-t pt-6">
                    <h2 className="text-2xl font-semibold mb-4">Application Status</h2>
                    <div className="flex items-center gap-4">
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className="p-3 w-full md:w-1/3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="PENDING">Pending</option>
                            <option value="REJECTED">Rejected</option>
                            <option value="SELECTED">Selected</option>
                        </select>
                        <button
                            onClick={handleSaveChanges}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
                        >
                            Update Status
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const InfoSection = ({ title, children, bgColor }) => (
    <div>
        <h2 className={`text-xl font-semibold mb-2 ${bgColor}`}>{title}</h2>
        <div className={`p-4 rounded-lg ${bgColor}`}>
            {children}
        </div>
    </div>
);

const InfoItem = ({ label, value }) => (
    <div className="mb-2">
        <span className="font-medium text-gray-700">{label}: </span>
        <span className="text-gray-800">{value}</span>
    </div>
);

const LinkButton = ({ href, icon, text }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-300"
    >
        {icon}
        <span>{text}</span>
    </a>
);

export default ApplicantDetails;
