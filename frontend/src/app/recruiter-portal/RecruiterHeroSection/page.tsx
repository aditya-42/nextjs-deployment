"use client"
import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation'; 
import Navbar from '@/components/shared/Navbar';
//import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from '@/components/shared/Footer';

const RecruiterHeroSection: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const router = useRouter(); 

    const searchJobHandler = (): void => {
        // Implement redux logic (pending)
        router.push('/recruiter-dashboard'); 
    };

    return (
        <>
            <Navbar />
            <div className='text-center bg-gray-50 py-16 px-4'>
                <div className='flex flex-col gap-6 max-w-4xl mx-auto'>
                    <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                        Trusted by 500+ Companies
                    </span>
                    <h1 className='text-5xl font-bold leading-tight'>
                        Find Top Talent, Hire Smarter <br /> and Build Your 
                        <span className='text-[#6A38C2]'> Dream Team</span>
                    </h1>
                    <p className='text-gray-600 text-lg'>
                        Discover pre-vetted candidates from diverse industries. Make faster, data-driven hiring decisions and streamline your recruitment process.
                    </p>
                    <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-white'>
                        <input
                            type='text'
                            placeholder='Search for candidates'
                            value={query}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                            className='outline-none border-none w-full py-2 px-2 rounded-l-full'
                        />
                        <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2] text-white p-3'>
                            <Search className='h-5 w-5' />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Why Register Section */}
            <div className='py-20 bg-white text-center px-6'>
                <h2 className='text-3xl font-bold text-gray-800'>Why Choose Us?</h2>
                <p className='text-gray-600 mt-4 max-w-2xl mx-auto'>
                    Our platform connects recruiters with top-tier talent, offering advanced AI-driven matching, verified profiles, and seamless communication tools.
                </p>
                <div className='flex justify-center gap-10 mt-8'>
                    <div className='p-6 shadow-md rounded-lg bg-gray-50 max-w-sm'>
                        <h3 className='text-xl font-semibold text-[#6A38C2]'>AI-Powered Hiring</h3>
                        <p className='text-gray-600 mt-2'>We leverage smart algorithms to match you with the best candidates quickly.</p>
                    </div>
                    <div className='p-6 shadow-md rounded-lg bg-gray-50 max-w-sm'>
                        <h3 className='text-xl font-semibold text-[#6A38C2]'>Verified Talent Pool</h3>
                        <p className='text-gray-600 mt-2'>Our database is filled with pre-screened, high-quality professionals.</p>
                    </div>
                    <div className='p-6 shadow-md rounded-lg bg-gray-50 max-w-sm'>
                        <h3 className='text-xl font-semibold text-[#6A38C2]'>Seamless Communication</h3>
                        <p className='text-gray-600 mt-2'>Connect instantly via chat, schedule interviews, and manage your hiring pipeline efficiently.</p>
                    </div>
                </div>
            </div>

            {/* Carousel Section */}
          
          <Footer/>
        </>
    );
};

export default RecruiterHeroSection;
