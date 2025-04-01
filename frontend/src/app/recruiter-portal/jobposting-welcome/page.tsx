"use client"
import React from 'react'

import { useRouter } from 'next/navigation'

import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

const Page = () => {
  
const router = useRouter();

  const handleSubmit = () => {
    router.push('/recruiter-portal/JobPostingForm')
  }

  return (
    <>
    <Navbar/>
    
    <div className="bg-gradient-to-r from-blue-100 mt-6 mb-4 via-indigo-100 to-purple-100 p-8 rounded-3xl shadow-xl max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6 tracking-tight">Welcome to Our Talent Acquisition Portal</h2>
      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        We&apos;re excited to help you find the perfect candidates for your open positions. Please take a moment to fill out the job posting form below. This information will help us ensure that your job listings are presented clearly and attractively to potential candidates.
      </p>

      <h3 className="text-2xl font-medium text-gray-800 mb-4">Here&apos;s a quick overview of the steps in the form:</h3>
      <ul className="list-inside list-decimal space-y-2 text-gray-700 mb-8">
        <li><span className="font-semibold">Job Details</span> – Provide the basics about the role.</li>
        <li><span className="font-semibold">Location & Salary</span> – Specify where the job is located and the salary range.</li>
        <li><span className="font-semibold">Skills & Deadline</span> – Let us know the essential skills required and the application deadline.</li>
        <li><span className="font-semibold">Company Overview & Benefits</span> – Share more about your company culture and the benefits offered.</li>
        <li><span className="font-semibold">Review & Submit</span> – Review the details and submit your job posting.</li>
      </ul>

      <h4 className="text-xl font-semibold text-gray-800 mb-4">Tips:</h4>
      <ul className="list-inside list-disc space-y-2 text-gray-700 mb-8">
        <li>Be as clear and detailed as possible to attract the right candidates.</li>
        <li>Ensure that all required fields are filled out before submitting.</li>
      </ul>

      <p className="text-xl font-semibold text-gray-800 mb-6"><strong>Let’s get started!</strong></p>

      <button 
        onClick={handleSubmit}
        id="start-form-button" 
        className="bg-[#6A38C2]   from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Start the Form
      </button>
    </div>

    <Footer/>
    </>
  )
}

export default Page
