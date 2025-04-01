"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const Page = () => {
  const router = useRouter();

  return (
    <>

    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Congratulations!</h2>
        <p className="text-gray-600 mt-2">Your application has been submitted successfully.</p>

        <button 
          onClick={() => router.push('/')} 
          className="mt-6 px-6 py-2 bg-green-500 text-white text-lg font-medium rounded-full shadow-md hover:bg-green-600 transition-all"
        >
          Go Back to Home
        </button>
      </div>
    </div>

    <Footer/>

    </>
  );
}

export default Page;
