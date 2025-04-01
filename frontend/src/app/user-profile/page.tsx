"use client";
import { useState, useEffect, useCallback } from "react";
import JobList from "@/components/JobList";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useDropzone } from 'react-dropzone';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Job {
    id: string;
    role: string;
    company: string;
    appliedOn: string;
    status: string;
}

export default function UserProfilePage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    // @ts-ignore
    const [user,setUser] = useState(null);
    // @ts-ignore
    const [applicant,setApplicant] = useState(null);
    const [mergedUser, setMergedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    const [newResume, setNewResume] = useState<File | null>(null); // State for new resume file


    const fetchUserData = useCallback(async () => {  // Using useCallback
        try {
            setLoading(true);
            const email = localStorage.getItem("email");
            if (!email) {
                console.error("User email not found in localStorage.");
                return;
            }

            // Fetch User Data
            const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/get-user/${email}`);
            if (!userResponse.ok) throw new Error("Failed to fetch user data.");
            const userData = await userResponse.json();

            // Fetch Applicant Data
            const applicantResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applicant/applications/${email}`);
            if (!applicantResponse.ok) throw new Error("Failed to fetch applicant data.");
            const applicantData = await applicantResponse.json();

            console.log("User Data:", userData);
            console.log("Applicant Data:", applicantData);

            // Update states
            setUser(userData);
            setApplicant(applicantData);

            // Merge the data
            const mergedData = {
                ...userData,
                ...(Array.isArray(applicantData) ? applicantData[0] : applicantData),
            };

            setMergedUser(mergedData);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch user data.", { position: "top-right", autoClose: 3000 });  // Using toast
        } finally {
            setLoading(false);
        }
    }, [setUser , setApplicant]);


    const fetchJobApplications = useCallback(async () => {
        try {
            const email = localStorage.getItem("email");
            if (!email) {
                console.error("User email not found.");
                return;
            }

            // API to get job applications
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applicant/applications/${email}`);
            if (!response.ok) throw new Error("Failed to fetch job applications.");
            
            const data = await response.json();
            setJobs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching job applications:", error);
             toast.error("Failed to fetch job applications.", { position: "top-right", autoClose: 3000 });  // Using toast
        }
    }, []);

    useEffect(() => {
        fetchUserData();
        fetchJobApplications();
    }, [fetchUserData, fetchJobApplications]);


    const openResumeModal = () => {
        setIsResumeModalOpen(true);
    };

    const closeResumeModal = () => {
        setIsResumeModalOpen(false);
        setNewResume(null);  
    };


    // Function to handle resume upload
    const handleResumeUpload = async () => {
        if (!newResume) {
             toast.warn("Please select a resume to upload.", { position: "top-right", autoClose: 3000 });  // Using toast
            return;
        }

        const formData = new FormData();
        formData.append("resume", newResume);

        try {
            const email = localStorage.getItem("email");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/upload-resume/${email}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to upload resume: ${response.status}`);
            }

            // Refresh user data after successful upload
            fetchUserData(); 
             toast.success("Resume uploaded successfully!", { position: "top-right", autoClose: 3000 });  // Using toast
        } catch (error) {
            console.error("Error uploading resume:", error);
            toast.error("Failed to upload resume. Please try again.", { position: "top-right", autoClose: 3000 });  // Using toast
        } finally {
            setNewResume(null); 
            closeResumeModal();
        }
    };


    const handleResumeDelete = async () => {
        try {
            const email = localStorage.getItem("email");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/delete-resume/${email}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Failed to delete resume: ${response.status}`);
            }

            // Refresh user data after successful deletion
            fetchUserData(); // Use fetchUserData here
             toast.success("Resume deleted successfully!", { position: "top-right", autoClose: 3000 });  // Using toast
             closeResumeModal();

        } catch (error) {
            console.error("Error deleting resume:", error);
              toast.error("Failed to delete resume. Please try again.", { position: "top-right", autoClose: 3000 });  // Using toast
        }
    };


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: '.pdf,.doc,.docx',
        onDrop: acceptedFiles => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                setNewResume(acceptedFiles[0]);
            }
        }
    });

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewResume(e.target.files[0]);
        }
    };


    if (loading) {
        return (
            <>
                <Navbar />
                <div className="max-w-4xl mx-auto text-center p-10">
                    <p className="text-gray-500 text-lg">Loading user data...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (!mergedUser) {
        return (
            <>
                <Navbar />
                <div className="max-w-4xl mx-auto text-center p-10">
                    <p className="text-red-500 text-lg">User not found.</p>
                </div>
                <Footer />
            </>
        );
    }

    // Extract user initials
    const userInitials = mergedUser.fullName
        ? mergedUser.fullName.split(" ").map((name: string) => name[0]).join("")
        : "";

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        {/* User Avatar */}
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                            {userInitials}
                        </div>
                        <div>
                            <h1 className="font-semibold text-2xl text-gray-800">{mergedUser.fullName}</h1>
                            <p className="text-gray-500">{mergedUser.education || "No education provided"}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            alert("Edit Profile");
                             fetchUserData(); // Refresh data after update
                        }}
                        className="border p-2 rounded-md text-sm font-semibold text-blue-500 hover:bg-gray-100 transition-all duration-200 ease-in-out"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* User Details Section */}
                <div className="my-5 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-lg text-gray-700">Full Name:</span>
                        <span className="text-gray-600">{mergedUser.fullName}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="font-medium text-lg text-gray-700">Education:</span>
                        <span className="text-gray-600">{mergedUser.education || "No education information provided"}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="font-medium text-lg text-gray-700">Email:</span>
                        <span className="text-gray-600">{mergedUser.email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="font-medium text-lg text-gray-700">Phone:</span>
                        <span className="text-gray-600">{mergedUser.phoneNumber}</span>
                    </div>

                    {/* Clickable area to open Resume Modal */}
                    <div
                        onClick={openResumeModal}
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                    >
                        <span className="font-medium text-lg text-gray-700">Resume:</span>
                        {mergedUser.uploadResume ? (
                            <span className="text-blue-500 hover:underline">
                                View/Update Resume
                            </span>
                        ) : (
                            <span>Upload Resume</span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="font-medium text-lg text-gray-700">Skills:</span>
                        <span className="text-gray-600">{mergedUser.skills || "No skills added"}</span>
                    </div>
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="mb-20">
                {jobs.length > 0 ? <JobList jobs={jobs} /> : <p>No applications found.</p>}
            </div>

            {/* Modal Component (Inline) */}
            {isResumeModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
                        <button onClick={closeResumeModal} className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700">
                            X
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Manage Resume</h2>

                        {/* Display existing resume */}
                        {mergedUser.uploadResume && (
                            <div className="mb-4">
                                <p>Current Resume:</p>
                                <a
                                    href={`http://localhost:5001${mergedUser.uploadResume}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline block"
                                >
                                    {mergedUser.uploadResume.split("-").pop().split("?")[0]}
                                </a>
                            </div>
                        )}

                        {/* Drag and Drop Area */}
                        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} border-2 border-dashed rounded-md p-4 mb-4 text-center`}>
                            <input {...getInputProps()} onChange={handleFileSelect} />
                            {
                                isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drag new resume here, or click to select files</p>
                            }
                        </div>

                        {/* Display selected file name */}
                        {newResume && (
                            <p>Selected file: {newResume.name}</p>
                        )}

                        {/* Upload Button */}
                        <button
                            onClick={handleResumeUpload}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-200 mt-2"
                        >
                            {mergedUser.uploadResume ? 'Update Resume' : 'Upload Resume'}
                        </button>

                        {/* Delete Button (Conditionally Rendered) */}
                        {mergedUser.uploadResume && (
                            <button
                                onClick={handleResumeDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200 mt-2 ml-2"
                            >
                                Delete Resume
                            </button>
                        )}
                    </div>
                </div>
            )}

            <Footer />
            <ToastContainer />
        </>
    );
}
