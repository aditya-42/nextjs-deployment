"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import axios from 'axios';
import { useRouter } from 'next/navigation'

type FormData = {
  jobTitle: string;
  employmentType: string;
  jobDescription: string;
  location: string;
  salaryRangeMin: string; // Min salary
  salaryRangeMax: string; // Max salary
  requirements: string;
  skills: string;
  applicationDeadline: string;
  companyOverview: string;
  benefits: string;
  contactEmail: string;
  datePosted: string; // Auto-fill this when submitting the form
};

const jobTitles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer', 'Backend Developer'];
const skillsList = ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'AWS'];
const locationsList = ['Remote', 'New York', 'San Francisco', 'London', 'Berlin'];
const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

const JobPostingForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    employmentType: '',
    jobDescription: '',
    location: '',
    salaryRangeMin: '', // Min salary
    salaryRangeMax: '', // Max salary
    requirements: '',
    skills: '',
    applicationDeadline: '',
    companyOverview: '',
    benefits: '',
    contactEmail: '',
    datePosted: '', 
  });

  // Handle form field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle select change for dropdowns
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Progress bar width calculation
  const progress = (step / 5) * 100;

  // Form step navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Add datePosted to formData before sending
    const dataToSubmit = {
      ...formData,
      datePosted: new Date().toISOString(), // Automatically set the date when the job is posted
    };

    // Call backend API
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/recruiter/create-job-post`, dataToSubmit);
      console.log("Response from backend", response.data);

      // Clear the form
      setFormData({
        jobTitle: '',
        employmentType: '',
        jobDescription: '',
        location: '',
        salaryRangeMin: '',
        salaryRangeMax: '',
        requirements: '',
        skills: '',
        applicationDeadline: '',
        companyOverview: '',
        benefits: '',
        contactEmail: '',
        datePosted: '',
      });

      // Redirect to confirmation page
      router.push('/recruiter-portal/response-confirmation')
      //window.location.href = '/recruiter-portal/response-confirmation';
    } catch (error) {
      alert("Failed to submit job posting. Please try again.");
      console.error('Failed to submit job posting:', error);
      return;
    }

    console.log('Job posting submitted:', dataToSubmit);
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-w-4xl mx-auto mt-10 mb-4 p-8 rounded-lg shadow-lg font-sans">
        {/* Progress Bar */}
        <div className="flex items-center gap-x-1 mb-6">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`w-full h-2.5 flex flex-col justify-center overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500 ${step > index ? 'bg-blue-600' : 'bg-gray-300'}`}
              role="progressbar"
              aria-valuenow={(progress * (index + 1)) / 100}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          ))}
          <div className="w-10 text-end">
            <span className="text-sm text-gray-800 dark:text-white">{`${Math.round(progress)}%`}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold mb-4">Step 1: Job Details</h2>
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  list="jobTitleOptions"
                  placeholder="Select or type a job title"
                />
                <datalist id="jobTitleOptions">
                  {jobTitles.map((title) => (
                    <option key={title} value={title} />
                  ))}
                </datalist>
              </div>
              <div>
                <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  id="employmentType"
                  value={formData.employmentType}
                  onChange={handleSelectChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="">Select an employment type</option>
                  {employmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <textarea
                  name="jobDescription"
                  id="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold mb-4">Step 2: Location & Salary</h2>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  list="locationOptions"
                  placeholder="Select or type a location"
                />
                <datalist id="locationOptions">
                  {locationsList.map((location) => (
                    <option key={location} value={location} />
                  ))}
                </datalist>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="salaryRangeMin" className="block text-sm font-medium text-gray-700">
                    Min Salary
                  </label>
                  <input
                    type="number"
                    name="salaryRangeMin"
                    id="salaryRangeMin"
                    value={formData.salaryRangeMin}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Min salary"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="salaryRangeMax" className="block text-sm font-medium text-gray-700">
                    Max Salary
                  </label>
                  <input
                    type="number"
                    name="salaryRangeMax"
                    id="salaryRangeMax"
                    value={formData.salaryRangeMax}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Max salary"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold mb-4">Step 3: Skills & Deadline</h2>
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                  Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  id="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  list="skillsOptions"
                  placeholder="Select or type skills"
                />
                <datalist id="skillsOptions">
                  {skillsList.map((skill) => (
                    <option key={skill} value={skill} />
                  ))}
                </datalist>
              </div>
              <div>
                <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">
                  Application Deadline
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  id="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold mb-4">Step 4: Company Info & Benefits</h2>
              <div>
                <label htmlFor="companyOverview" className="block text-sm font-medium text-gray-700">
                  Responsibilities
                </label>
                <textarea
                  name="companyOverview"
                  id="companyOverview"
                  value={formData.companyOverview}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
                  Requirements & Qualifications
                </label>
                <textarea
                  name="requirements"
                  id="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
                  Benefits
                </label>
                <textarea
                  name="benefits"
                  id="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold mb-4">Step 5: Contact Info</h2>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  id="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-300 text-white rounded-md"
              >
                Previous
              </button>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>

        </form>
      </div>
      <Footer />
    </>
  );
};

export default JobPostingForm;
