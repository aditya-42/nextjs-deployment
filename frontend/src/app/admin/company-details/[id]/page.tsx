"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Navbar from "@/components/shared/Navbar";

import { useRouter } from "next/navigation";

// Company Interface
interface Company {
  _id: string;
  companyName: string;
  companyDescription: string;
  companyPhoneNumber: string;
  companySize: string;
  fullName: string;
  industry: string;
  jobTitle: string;
  location: string;
  companyEmail: string;
  phoneNumber: string;
  workEmail: string;
  verified: boolean;
}

export default function CompanyDetails() {
  const router = useRouter();
  const { id } = useParams(); // Get company ID from URL
  const [company, setCompany] = useState<Company | null>(null);

  // Fetch Company Details
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/company/get-company/${id}`);
        setCompany(response.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  // Verify Company
  const verifyCompany = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/company/verify-company/${id}`);

      // Update the state
      setCompany((prev) => prev ? { ...prev, verified: true } : null);

      alert("Company verified successfully!");
    } catch (error) {
      console.error("Error verifying company:", error);
    }
  };


  const handleDashboard = () => {
    router.push("/admin")
  }

  if (!company) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Company Details</h2>
        <h3
          onClick={handleDashboard}
          className="cursor-pointer text-blue-500 text-lg font-semibold flex items-center gap-2 p-2 rounded-md transition-all"
        >
          ← Go Back
        </h3>



        {/* Company Description */}
        <div className="p-4 bg-gray-100 border-l-4 border-blue-500 rounded-md">
          <p className="text-gray-700 text-lg leading-relaxed">{company.companyDescription}</p>
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-2 gap-6 text-gray-800 mt-6">
          <div>
            <p className="font-medium text-gray-700">Company Name</p>
            <p className="text-gray-900 font-bold">{company.companyName}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Industry</p>
            <p className="text-gray-900 font-bold">{company.industry}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Company Size</p>
            <p className="text-gray-900 font-bold">{company.companySize}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Location</p>
            <p className="text-gray-900 font-bold">{company.location}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-6 text-gray-800 mt-6">
          <div>
            <p className="font-medium text-gray-700">Contact Person</p>
            <p className="text-gray-900 font-bold">{company.fullName}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Job Title</p>
            <p className="text-gray-900 font-bold">{company.jobTitle}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Company Email</p>
            <p className="text-gray-900 font-bold">{company.companyEmail}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Work Email</p>
            <p className="text-gray-900 font-bold">{company.workEmail}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Phone Number</p>
            <p className="text-gray-900 font-bold">{company.phoneNumber}</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-4 mt-6">
          <p className="font-medium text-gray-900">Status:</p>
          <span className={`px-4 py-1 text-sm font-bold rounded-md 
            ${company.verified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {company.verified ? "Verified" : "Unverified"}
          </span>
        </div>

        {/* Verify Button */}
        {!company.verified && (
          <>
            <Button
              className="mt-6 w-full bg-[#6A38C2] hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-all"
              onClick={verifyCompany}
            >
              Verify Company
            </Button>

            {/* //delelte button */}
            <Button
              className="mt-6 w-full bg-red-500 text-white font-semibold py-3 rounded-md border border-black"
            >
              Delete Company
            </Button>


          </>

        )}
      </div>
    </>
  );

}  