"use client";
import React, { useEffect, useState } from "react";
import {
    PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer, Legend, LabelList
} from "recharts";
import axios from "axios";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import Link from 'next/link';


const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#6366F1"];

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    //api ffetching
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/applicant/get-reports`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!data) return <div className="flex justify-center items-center h-screen">Error loading data</div>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Recruitment Analytics Dashboard</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Link
                        href={{
                            pathname: "/recruiter-portal/getAllJobs",
                            query: { section: "applicant" },
                        }}
                    >
                        <SummaryCard title="Total Applicants" value={data.totalApplicants} />
                    </Link>

                    <SummaryCard title="Avg. Experience" value={`${data.averageExperience?.avgExperience.toFixed(1) || 0} years`} />
                    <SummaryCard title="LinkedIn Profiles" value={`${data.applicationSource?.linkedInPercentage.toFixed(1) || 0}%`} />
                    <SummaryCard title="Portfolio Links" value={`${data.applicationSource?.portfolioPercentage.toFixed(1) || 0}%`} />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ChartCard title="Applications by Job Role" description="Distribution of applications across different job roles">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data.applicationsByJob}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="count"
                                    nameKey="jobRole"
                                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                >
                                    {data.applicationsByJob.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [`${value} applications`, `Job Role: ${name}`]} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Monthly Applications Trend" description="Number of applications received each month">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data.monthlyApplications}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => [`${value} applications`, 'Applications']} />
                                <Legend />
                                <Line type="monotone" dataKey="count" name="Applications" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Applicants by Experience Level" description="Distribution of applicants based on years of experience">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.applicantsByExperience}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="experienceLevel" label={{ value: 'Years of Experience', position: 'bottom', offset: 0 }} />
                                <YAxis label={{ value: 'Number of Applicants', angle: -90, position: 'insideLeft' }} />
                                <Tooltip formatter={(value) => [`${value} applicants`, 'Applicants']} />
                                <Bar dataKey="count" fill="#82ca9d">
                                    <LabelList dataKey="count" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Top Skills Among Applicants" description="Most common skills mentioned in applications">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.topSkills} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="skill" type="category" width={100} />
                                <Tooltip formatter={(value) => [`${value} applicants`, 'Applicants with this skill']} />
                                <Bar dataKey="count" fill="#8884d8">
                                    <LabelList dataKey="count" position="right" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
            </div>
            <Footer />
        </div>
    );
};

const SummaryCard = ({ title, value }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
        </div>
    </div>
);

const ChartCard = ({ title, description, children }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 mb-4">{description}</p>
            <div className="flex justify-center">{children}</div>
        </div>
    </div>
);

export default Dashboard;
