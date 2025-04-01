"use client"
import React, { useEffect, useState } from 'react';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

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

const ApplicationForm: React.FC = () => {
    const [applicant] = useState<Applicant | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const jobTitle = searchParams.get('jobTitle') || '';


    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        skills: '',
        prevJobTitle: '',
        prevCompany: '',
        prevSalary: '',
        resume: null,
        linkedIn: '',
        portfolio: '',
    });

    const [isLoaded, setIsLoaded] = useState(false); // Add this state

    useEffect(() => {
        // Retrieve user data from localStorage or your chosen data source
        const userData = JSON.parse(localStorage.getItem('user') || '{}');

        console.log(userData, "This is the user data")

        // If user data exists, prefill the form fields
        if (userData) {
            console.log("prefillig user data" , userData)
            setFormData((prevData) => ({
                ...prevData,
                name: userData.fullName,
                email: userData.email,
                phone: userData.phoneNumber,
            }));
        }
        setIsLoaded(true);
    }, []);

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData((prevData) => ({
                ...prevData,
                resume: e.target.files[0],
            }));
        }
    };


    //confirmation email
    const sendConfirmationEmail = async()=>{

      //console.log("I am inside the confirmation")
        console.log(formData.email)

            if (formData.email) {
                try {
                    // Make an API call to send the email with the meeting link
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/applicant/send-confirmation`, {
                        email: formData.email,
                    });

                    console.log("This is the email " , formData.email)
    
                    if (response.status === 200) {
                        alert("Send Successfully");
                    } else {
                        alert('Failed to send confirmation');
                    }
    
                   
                } catch (error) {
                    console.error('Error sending confirmation', error);
                    alert('Failed to send confirmation');
                }
            } 
        };
    

    //api call once the submit button is clicked
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
    

        const formDataForUpload = new FormData();

        // Append all fields except the resume
        Object.keys(formData).forEach((key) => {
            if (key !== "resume") {
                formDataForUpload.append(key, formData[key]);
            }
        });

        // Append the resume file separately
        if (formData.resume) {
            formDataForUpload.append("resume", formData.resume);
        }

        //append applied job role in the db
        formDataForUpload.append('appliedJobRole', jobTitle);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/applicant/apply`,
                formDataForUpload,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Response from backend:', response);

            // Reset form fields
            setFormData({
                name: '',
                email: '',
                phone: '',
                education: '',
                experience: '',
                skills: '',
                prevJobTitle: '',
                prevCompany: '',
                prevSalary: '',
                resume: null,
                linkedIn: '',
                portfolio: '',
            });

            router.push('/applicant/application-confirmation');

            //send mail to the applicant about confirmation
            sendConfirmationEmail(applicant?.email);
            

        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Application failed to submit.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <p className="text-lg font-semibold mb-4">Applying for job : {jobTitle}</p>

            <div className="max-w-2xl mx-auto mt-5 mb-5  p-6 bg-white shadow-lg rounded-lg">

            {loading && <p>Submitting application...</p>}

          

                
                {isLoaded ? (
                    <>
                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="flex mb-2">
                                <div
                                    className={`w-1/3 h-2 rounded-lg ${step === 1 ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                ></div>
                                <div
                                    className={`w-1/3 h-2 rounded-lg ${step === 2 ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                ></div>
                                <div
                                    className={`w-1/3 h-2 rounded-lg ${step === 3 ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-600">
                                <span>Step 1</span>
                                <span>Step 2</span>
                                <span>Step 3</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            {step === 1 && (
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                                            Highest Level of Education
                                        </label>
                                        <input
                                            type="text"
                                            name="education"
                                            id="education"
                                            value={formData.education}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                                            Years of Experience
                                        </label>
                                        <input
                                            type="number"
                                            name="experience"
                                            id="experience"
                                            value={formData.experience}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                                            Relevant Skills
                                        </label>
                                        <input
                                            type="text"
                                            name="skills"
                                            id="skills"
                                            value={formData.skills}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-700">Previous Job Information</h3>
                                    <div>
                                        <label htmlFor="prevJobTitle" className="block text-sm font-medium text-gray-700">
                                            Previous Job Title
                                        </label>
                                        <input
                                            type="text"
                                            name="prevJobTitle"
                                            id="prevJobTitle"
                                            value={formData.prevJobTitle}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="prevCompany" className="block text-sm font-medium text-gray-700">
                                            Previous Company
                                        </label>
                                        <input
                                            type="text"
                                            name="prevCompany"
                                            id="prevCompany"
                                            value={formData.prevCompany}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="prevSalary" className="block text-sm font-medium text-gray-700">
                                            Previous Salary (Annual)
                                        </label>
                                        <input
                                            type="number"
                                            name="prevSalary"
                                            id="prevSalary"
                                            value={formData.prevSalary}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                                            Upload Resume
                                        </label>
                                        <input
                                            type="file"
                                            name="resume"
                                            id="resume"
                                            onChange={handleFileChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700">
                                            LinkedIn Profile (Optional)
                                        </label>
                                        <input
                                            type="url"
                                            name="linkedIn"
                                            id="linkedIn"
                                            value={formData.linkedIn}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
                                            Portfolio URL (Optional)
                                        </label>
                                        <input
                                            type="url"
                                            name="portfolio"
                                            id="portfolio"
                                            value={formData.portfolio}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between mt-6">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                    >
                                        Back
                                    </button>
                                )}
                                {step < 3 ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        Submit Application
                                    </button>
                                )}
                            </div>

                        </form>
                    </>
                ) : (
                    <div>Loading form...</div> 
                )}
            </div>

            <Footer />
        </>
    );
};

export default ApplicationForm;
