"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";

// Applicant
export interface Applicant {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  appliedJobRole: string;
}


//company
export interface Company {
  _id: string;
  companyName: string;
  fullName: string;
  companyEmail: string;
  phoneNumber: string;
  verified: boolean;
}

// fetch Applicants
async function fetchApplicants() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/applicant/get-applicants`);
  return response.data;
}

// fetch Companies
async function fetchCompanies() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/company/get-companies`);
  return response.data;
}

export default function AdminPage() {
  const router = useRouter();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filter, setFilter] = useState("");
  const [activeTab, setActiveTab] = useState<"applicants" | "companies">("applicants");

  useEffect(() => {
    const loadData = async () => {
      const [applicantData, companyData] = await Promise.all([fetchApplicants(), fetchCompanies()]);
      setApplicants(applicantData);
      setCompanies(companyData);
    };

    loadData();
  }, []);

  //function to verify company
  const verifyCompany = async (companyId: string) => {
    try {
      const confirmVerify = window.confirm("Are you sure you want to verify this company?");
      if (!confirmVerify) return;

      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/company/verify/${companyId}`);

      setCompanies((prev) =>
        prev.map((company) =>
          company._id === companyId ? { ...company, verified: true } : company
        )
      );

      alert("Company verified successfully!");
    } catch (error) {
      console.error("Error verifying company:", error);
    }
  };

  //function to navigate to company details
  const viewCompanyDetails = (companyId: string) => {
    router.push(`/admin/company-details/${companyId}`);
  }


  // Delete Applicant
  const deleteApplicant = async (applicantId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this applicant?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/applicant/delete-applicant/${applicantId}`);
      setApplicants((prev) => prev.filter((applicant) => applicant._id !== applicantId));
      alert("Applicant deleted successfully!");
    } catch (error) {
      console.error("Error deleting applicant:", error);
    }
  };


  //delete company
  const deleteCompany = async (companyId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this company?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/company/delete-company/${companyId}`);
      setCompanies((prev) => prev.filter((company) => company._id !== companyId));
      alert("Company deleted successfully!");
    } catch (error) {
      console.error("Error deleting company:");
      }

  }


  // View Applicant Details
  const viewApplicantDetails = (applicantId: string) => {
    router.push(`/recruiter-portal/application-tracking/${applicantId}`);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <h3 className="text-2xl font-bold mb-5">Admin Dashboard</h3>

        {/* ===================== Toggle Buttons ===================== */}
        <div className="flex gap-4 mb-5">
          <Button
            className={`px-5 py-2 text-lg ${activeTab === "applicants" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            onClick={() => setActiveTab("applicants")}
          >
            Applicant Details
          </Button>

          <Button
            className={`px-5 py-2 text-lg ${activeTab === "companies" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            onClick={() => setActiveTab("companies")}
          >
            Company Details
          </Button>
        </div>

        {/* ===================== JOB APPLICANTS SECTION ===================== */}
        {activeTab === "applicants" && (
          <div>
            <h4 className="text-xl font-semibold mb-3">Job Applicants</h4>
            <Input
              className="w-1/3 mb-4"
              placeholder="Search applicants by name or email"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Table>
              <TableCaption>List of job applicants</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Applied Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow key={applicant._id}>
                    <TableCell>{applicant.fullName}</TableCell>
                    <TableCell>{applicant.email}</TableCell>
                    <TableCell>{applicant.phoneNumber}</TableCell>
                    <TableCell>{applicant.appliedJobRole}</TableCell>
                    <TableCell>
                      <Button
                        className="mr-2 bg-blue-500 text-white"
                        onClick={() => viewApplicantDetails(applicant._id)}
                      >
                        View
                      </Button>
                      <Button className="bg-red-500 text-white" onClick={() => deleteApplicant(applicant._id)}>
                        Delete
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* ===================== COMPANY RECRUITER SECTION ===================== */}
        {activeTab === "companies" && (
          <div>
            <h4 className="text-xl font-semibold mb-3">Company Recruiters</h4>
            <Input
              className="w-1/3 mb-4"
              placeholder="Search companies by name or email"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Table>
              <TableCaption>List of registered companies</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company._id}>
                    <TableCell>{company.companyName}</TableCell>
                    <TableCell>{company.companyEmail}</TableCell>
                    <TableCell>{company.phoneNumber}</TableCell>
                    <TableCell>
                      {company.verified ? (
                        <span className="text-green-600 font-semibold">Verified</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Unverified</span>
                      )}
                    </TableCell>

                    <TableCell>

                      <Button
                        className="mr-2 bg-blue-500 text-white"
                        onClick={() => viewCompanyDetails(company._id)}
                      >
                        View
                      </Button>
                      <Button className="bg-red-500 text-white" onClick={() => { deleteCompany(company._id) }}>
                        Delete
                      </Button>


                      {!company.verified && (
                        <Button
                          className="bg-green-500 text-white"
                          onClick={() => verifyCompany(company._id)}
                        >
                          Verify
                        </Button>
                      )}
                    </TableCell>


                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
}
