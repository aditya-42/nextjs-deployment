// src/components/Home.tsx

'use client';

import React from 'react';
//import { useRouter } from 'next/navigation'; // Correct hook for Next.js

import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from './hooks/useGetAllJobs';
import JobSeekerTestimonials from './JobSeekerTestimonials';
import RecruitingCompanies from './RecruitingCompanies';
import JobAlertSignup from './JobAlertSignup';

// Define a type for the user
// type User = {
//   role?: string;
//   // Add other user properties as needed
// };

const Home: React.FC = () => {
  //const [user, setUser] = useState<User | null>(null); // Added type annotation
  //const router = useRouter(); // Correctly using Next.js router

  useGetAllJobs();

  // useEffect(() => {
  //   const fetchUser = () => {
  //     try {
  //       const storedUser = localStorage.getItem('user');
  //       if (storedUser) {
  //         const fetchedUser: User = JSON.parse(storedUser);
  //         setUser(fetchedUser);

  //         if (fetchedUser.role === 'recruiter') {
  //           router.push('/recruiter'); 
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
       
  //     }
  //   };

  //   fetchUser();
  // }, []); // Empty dependency array so the effect runs only once

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <JobSeekerTestimonials />
      <RecruitingCompanies />
      <JobAlertSignup />
      <Footer />
    </div>
  );
};

export default Home;
