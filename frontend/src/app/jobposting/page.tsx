// "use client";
// import dynamic from 'next/dynamic';
// const LeafletMap = dynamic(() => import('../../components/LeafletMap'), {
//   ssr: false,
// });


// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// // import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';

// // Import image directly
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// //Navabr
// import Navbar from "../../components/shared/Navbar"
// import Footer from '@/components/shared/Footer';

// // type JobType = 'Full-Time' | 'Part-Time' | 'Contract';
// // type LanguageType = 'English' | 'French' | 'Bilingual';
// // type SalaryType = 'Annual' | 'Hourly';
// // type EmploymentPeriodType = 'Permanent' | 'Contract' | 'Seasonal' | 'Casual';
// // type WorkTypeType = 'Remote' | 'Hybrid' | 'On-site';

// export interface Job {
//     _id: string;
//     jobTitle: string;
//     employmentType: string;
//     jobDescription: string;
//     location: string;
//     salaryRangeMin: number;
//     salaryRangeMax: number;
//     requirements: string;
//     skills: string[];
//     applicationDeadline: string;
//     companyOverview: string;
//     benefits: string;
//     contactEmail: string;
//     companyName: string;
//     datePosted: string;
// }


// // Canadian provinces and territories
// const provinces = [
//     'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
//     'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
//     'Northwest Territories', 'Nunavut', 'Yukon'
// ];

// // Sample job data (20 jobs)
// // export const jobData: Job[] = [
// //     { id: 1, title: "Software Engineer", company: "TechCorp", location: "Toronto", province: "Ontario", jobType: "Full-Time", language: "English", salaryType: "Annual", salary: "$80,000 - $120,000", employmentPeriod: "Permanent", datePosted: "2023-05-15", isRemote: true, workType: "Remote", tags: ["Tech", "Software"] },
// //     { id: 2, title: "Marketing Specialist", company: "AdWorks", location: "Vancouver", province: "British Columbia", jobType: "Part-Time", language: "Bilingual", salaryType: "Hourly", salary: "$25 - $30", employmentPeriod: "Contract", datePosted: "2023-05-10", isRemote: false, workType: "Hybrid", tags: ["Marketing", "Creative"] },
// //     { id: 3, title: "Data Analyst", company: "DataCo", location: "Montreal", province: "Quebec", jobType: "Full-Time", language: "French", salaryType: "Annual", salary: "$70,000 - $90,000", employmentPeriod: "Permanent", datePosted: "2023-05-01", isRemote: true, workType: "Remote", tags: ["Data", "Analytics"] },
// //     { id: 4, title: "Customer Service Representative", company: "ServicePro", location: "Calgary", province: "Alberta", jobType: "Full-Time", language: "English", salaryType: "Hourly", salary: "$18 - $22", employmentPeriod: "Permanent", datePosted: "2023-05-18", isRemote: false, workType: "On-site", tags: ["Customer Service"] },
// //     { id: 5, title: "Graphic Designer", company: "DesignHub", location: "Ottawa", province: "Ontario", jobType: "Contract", language: "Bilingual", salaryType: "Hourly", salary: "$30 - $40", employmentPeriod: "Contract", datePosted: "2023-05-05", isRemote: true, workType: "Remote", tags: ["Design", "Creative"] },
// //     { id: 6, title: "Financial Analyst", company: "FinCorp", location: "Toronto", province: "Ontario", jobType: "Full-Time", language: "English", salaryType: "Annual", salary: "$75,000 - $95,000", employmentPeriod: "Permanent", datePosted: "2023-05-12", isRemote: false, workType: "On-site", tags: ["Finance", "Analytics"] },
// //     { id: 7, title: "Project Manager", company: "BuildCo", location: "Edmonton", province: "Alberta", jobType: "Full-Time", language: "English", salaryType: "Annual", salary: "$85,000 - $110,000", employmentPeriod: "Permanent", datePosted: "2023-05-08", isRemote: false, workType: "Hybrid", tags: ["Management", "Construction"] },
// //     { id: 8, title: "Registered Nurse", company: "HealthCare Inc.", location: "Halifax", province: "Nova Scotia", jobType: "Full-Time", language: "English", salaryType: "Annual", salary: "$70,000 - $90,000", employmentPeriod: "Permanent", datePosted: "2023-05-16", isRemote: false, workType: "On-site", tags: ["Healthcare", "Nursing"] },
// //     { id: 9, title: "Sales Representative", company: "SalesPro", location: "Winnipeg", province: "Manitoba", jobType: "Full-Time", language: "English", salaryType: "Annual", salary: "$50,000 - $70,000 + Commission", employmentPeriod: "Permanent", datePosted: "2023-05-03", isRemote: true, workType: "Remote", tags: ["Sales"] },
// //     { id: 10, title: "Web Developer", company: "WebTech Solutions", location: "Victoria", province: "British Columbia", jobType: "Full-Time", language: "English", salaryType: "Annual", salary: "$70,000 - $100,000", employmentPeriod: "Permanent", datePosted: "2023-05-14", isRemote: true, workType: "Remote", tags: ["Tech", "Web Development"] }
// // ];

// //getting all jobs from backend
// // const fetchJobs = async () => {
// //     try {
// //       const response = await fetch('http://localh    ost:5001/api/recruiter/getAlljobs');
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
// //       const data = await response.json();
// //       console.log(data); // To inspect the returned data
// //     } catch (error) {
// //       console.error('Error fetching job data:', error);
// //     }
// //   };
  
 

// // MapUpdater component
// function MapUpdater({ center }: { center: [number, number] }) {
//     const map = useMap();
//     useEffect(() => {
//         map.setView(center, 4);
//     }, [center, map]);

//     return null;
// }

// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: markerIcon2x.src,
//     iconUrl: markerIcon.src,
//     shadowUrl: markerShadow.src,
// });


// const JobBoard: React.FC = () => {

//     const router = useRouter();
//     const [filteredJobs, setFilteredJobs] = useState<Job[]>();
//     const [jobData, setJobData] = useState<Job[]>([]);
//     const [selectedLocation, setSelectedLocation] = useState<string>("");
//     const [selectedProvince, setSelectedProvince] = useState<string>("");
//     const [selectedJobType, setSelectedJobType] = useState<string>("");
//     const [selectedLanguage, setSelectedLanguage] = useState<string>("");
//     const [selectedWorkType, setSelectedWorkType] = useState<string>("");
//     const [datePosted, setDatePosted] = useState<string>("");
//     const [mapCenter, setMapCenter] = useState<[number, number]>([56.130366, -106.346771]); // Default to Canada's center

//     //fetch jobs when the component mounts
//     //fetch jobs when the component mounts
//  useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5001/api/recruiter/getAlljobs",{
//             credentials:"include",
//           }
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log("Fetched job data:", data); 
//         setFilteredJobs(data);
//         setJobData(data);
//       } catch (error) {
//         console.error("Error fetching job data:", error);
//       }
//     };
//     fetchData();
//   }, []);
  

//     // Filter jobs based on date posted
//     useEffect(() => {
//         if (datePosted) {
//             const parsedDate = new Date(datePosted);
//             const filtered = jobData.filter(job => {
//                 const jobDate = new Date(job.datePosted);
//                 return jobDate.getFullYear() === parsedDate.getFullYear() &&
//                     jobDate.getMonth() === parsedDate.getMonth() &&
//                     jobDate.getDate() === parsedDate.getDate();
//             });
//             setFilteredJobs(filtered);
//         } else {
//             setFilteredJobs(jobData);
//         }
//         // @ts-ignore
//     }, [datePosted]);
    

//     // Filter jobs based on tags
//     //search bar
//     const [searchQuery, setSearchQuery] = useState("");
//     // Function to update map based on location input
//     const updateMap = async () => {
//         if (selectedLocation) {
//             try {
//                 const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedLocation},Canada`);
//                 const data = await response.json();
//                 if (data && data.length > 0) {
//                     setMapCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching location data:", error);
//             }
//         }
//     };

//     useEffect(() => {
//         updateMap();
//     }, [selectedLocation]);

//     // Filter jobs based on selected options
//     const filterJobs = () => {
//         let filtered = jobData;

//         if (selectedLocation) {
//             filtered = filtered.filter(job => job.location.toLowerCase().includes(selectedLocation.toLowerCase()));
//         }

//         if (selectedProvince) {
//             filtered = filtered.filter(job => job.province === selectedProvince);
//         }

//         if (selectedJobType) {
//             filtered = filtered.filter(job => job.employmentType === selectedJobType);
//         }

//         if (selectedLanguage) {
//             filtered = filtered.filter(job => job.location === selectedLanguage);
//         }

//         if (selectedWorkType) {
//             filtered = filtered.filter(job => job.workType === selectedWorkType);
//         }

//         if (datePosted) {
//             const now = new Date();
//             filtered = filtered.filter(job => {
//                 const jobDate = new Date(job.datePosted);
//                 const diffTime = Math.abs(now.getTime() - jobDate.getTime());
//                 const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//                 switch (datePosted) {
//                     case "48h":
//                         return diffDays <= 2;
//                     case "30d":
//                         return diffDays <= 30;
//                     case "30d+":
//                         return diffDays > 30;
//                     default:
//                         return true;
//                 }
//             });
//         }

//         setFilteredJobs(filtered);
//     };


//     // search job 
//     const searchJobs = (query: string) => {
//         const filtered = jobData.filter(job =>
//             job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
//             job.companyName.toLowerCase().includes(query.toLowerCase()) ||
//             job.location.toLowerCase().includes(query.toLowerCase()) 
//             //job.province.toLowerCase().includes(query.toLowerCase())
//         );
//         setFilteredJobs(filtered);
//     };

//     useEffect(() => {
//         searchJobs(searchQuery);
//     }, [searchQuery]);




//     //reset filter
//     const resetFilters = () => {
//         setSelectedLocation("");
//         setSelectedProvince("");
//         setSelectedJobType("");
//         setSelectedLanguage("");
//         setSelectedWorkType("");
//         setDatePosted("");
//     };

//     //method to show job details page
//     const viewJobDetails = (id: string) => {
//         console.log("Navigating to JobDetails page with ID:", id);
//         router.push(`/jobDetails/${id}`);
//     }

//     return (
//         <>

//             <Navbar />


//             <div className="font-sans container mx-auto mt-3 p-6 flex flex-col md:flex-row bg-gray-50 min-h-screen">
//                 {/* Filters on the left */}
//                 <div className="w-full md:w-1/4 pr-6 mb-6 md:mb-0">
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-800">Filters</h2>

//                     {/* Location Input */}
//                     <div className="filter mb-4">
//                         <label className="block text-lg font-medium text-gray-700">Location:</label>
//                         <input
//                             type="text"
//                             placeholder="Enter Location"
//                             value={selectedLocation}
//                             onChange={(e) => setSelectedLocation(e.target.value)}
//                             className="mt-2 p-3 border rounded w-full focus:ring focus:ring-blue-300"
//                         />
//                     </div>

//                     {/* Province Select */}
//                     <div className="filter mb-4">
//                         <label className="block text-lg font-medium text-gray-700">Province:</label>
//                         <select
//                             onChange={(e) => setSelectedProvince(e.target.value)}
//                             className="mt-2 p-3 border rounded w-full focus:ring focus:ring-blue-300"
//                         >
//                             <option value="">All Provinces</option>
//                             {provinces.map(province => (
//                                 <option key={province} value={province}>{province}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Job Type Select */}
//                     <div className="filter mb-4">
//                         <label className="block text-lg font-medium text-gray-700">Job Type:</label>
//                         <select
//                             onChange={(e) => setSelectedJobType(e.target.value)}
//                             className="mt-2 p-3 border rounded w-full focus:ring focus:ring-blue-300"
//                         >
//                             <option value="">All Types</option>
//                             <option value="Full-Time">Full-Time</option>
//                             <option value="Part-Time">Part-Time</option>
//                             <option value="Contract">Contract</option>
//                         </select>
//                     </div>

//                     {/* Language Select */}
//                     <div className="filter mb-4">
//                         <label className="block text-lg font-medium text-gray-700">Language:</label>
//                         <select
//                             onChange={(e) => setSelectedLanguage(e.target.value)}
//                             className="mt-2 p-3 border rounded w-full focus:ring focus:ring-blue-300"
//                         >
//                             <option value="">All Languages</option>
//                             <option value="English">English</option>
//                             <option value="French">French</option>
//                             <option value="Bilingual">Bilingual</option>
//                         </select>
//                     </div>

//                     {/* Work Type Select */}
//                     <div className="filter mb-4">
//                         <label className="block text-lg font-medium text-gray-700">Work Type:</label>
//                         <select
//                             onChange={(e) => setSelectedWorkType(e.target.value)}
//                             className="mt-2 p-3 border rounded w-full focus:ring focus:ring-blue-300"
//                         >
//                             <option value="">All Work Types</option>
//                             <option value="Remote">Remote</option>
//                             <option value="Hybrid">Hybrid</option>
//                             <option value="On-site">On-site</option>
//                         </select>
//                     </div>

//                     {/* Date Posted Select */}
//                     <div className="filter mb-4">
//                         <label className="block text-lg font-medium text-gray-700">Date Posted:</label>
//                         <select
//                             onChange={(e) => setDatePosted(e.target.value)}
//                             className="mt-2 p-3 border rounded w-full focus:ring focus:ring-blue-300"
//                         >
//                             <option value="">Any Time</option>
//                             <option value="48h">Last 48 hours</option>
//                             <option value="30d">Last 30 days</option>
//                             <option value="30d+">More than 30 days</option>
//                         </select>
//                     </div>

//                     {/* Filter Button */}
//                     <button
//                         onClick={filterJobs}
//                         className="w-full bg-[#6A38C2] text-white p-3 rounded-lg hover:[#5a2cbf] focus:ring focus:ring-black-300"
//                     >
//                         Apply Filters
//                     </button>

//                     {/* //reset button */}
//                     <button onClick={resetFilters} className='w-full bg-[#6A38C2] text-white p-3 mt-3 rounded-lg hover:[#5a2cbf] focus:ring focus:ring-blue-300'>Reset Filters</button>
//                 </div>

//                 {/* Job Listings and Map on the right */}
//                 <div className="w-full md:w-3/4">
//                     {/* Map Container */}
//                     <div className="map-container w-full h-60 rounded-lg overflow-hidden mb-4 shadow-md">
                        
//                         <LeafletMap center={mapCenter} location={selectedLocation} />
                       
//                     </div>


//                     <p className="text-sm font-medium text-gray-700 mb-4">
//                         {/* Showing {filteredJobs.length} of {jobData.length} Jobs */}
//                     </p>
//                     {/* Search Bar */}
//                     <div className="mb-4">
//                         <input
//                             type="text"
//                             placeholder="Search jobs..."
//                             className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                         />
//                     </div>
//                     {/* Job Listing */}
//                     <div className="job-listings grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {filteredJobs && filteredJobs.map(job => (
//                             <div key={job._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
//                                 <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.jobTitle}</h3>
//                                 <p className="text-gray-600 mb-2">{job.companyName} , {job.location}</p>
//                                 <p className="text-sm text-gray-500">Type: {job.employmentType}  | Work Type: On-Site</p>
//                                 <p className="text-sm text-gray-500">Salary: ${job.salaryRangeMax}</p>
//                                 <p className="text-sm text-gray-500">Posted: {new Date(job.datePosted).toLocaleDateString('en-GB')}</p>
//                                 <button onClick={() => viewJobDetails(job._id)} className="mt-4 bg-[#6A38C2] text-white p-2 rounded-lg hover:bg-[#5a2cbf] focus:ring focus:ring-black-300">View Details</button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>



//             <Footer />
//         </>
//     );
// };

// export default JobBoard;
