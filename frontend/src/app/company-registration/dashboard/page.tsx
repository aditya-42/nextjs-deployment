"use client"
import { useRouter } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { FaBuilding, FaUsers, FaClipboardList, FaFileAlt, FaCheckCircle, FaUserPlus, FaPencilAlt, FaRocket } from 'react-icons/fa';

const WelcomeScreen = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push('/company-registration/registration-form');  
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center p-8 rounded-3xl shadow-md">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Register Your Company
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed">
              Join our premium job portal and start attracting top talent for your organization.
            </p>
            <button 
              onClick={handleStart}
              className="bg-[#6A38C2] text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-md transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Start Registration
            </button>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: <FaBuilding className="text-4xl text-gray-600 mb-4" />, 
                title: "Company Profile", 
                description: "Create a comprehensive profile to showcase your company's unique culture and values." 
              },
              { 
                icon: <FaUsers className="text-4xl text-gray-600 mb-4" />, 
                title: "Talent Attraction", 
                description: "Gain access to a wide pool of qualified candidates actively seeking new opportunities." 
              },
              { 
                icon: <FaClipboardList className="text-4xl text-gray-600 mb-4" />, 
                title: "Efficient Hiring", 
                description: "Streamline your recruitment process with our user-friendly tools and features." 
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
                {item.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center p-8 rounded-3xl shadow-md bg-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Registration Process</h2>
            <ul className="text-left text-gray-700 space-y-4 mb-8">
              {[
                { icon: <FaFileAlt />, text: "Fill in your company details" },
                { icon: <FaCheckCircle />, text: "Verify your company information" },
                { icon: <FaUserPlus />, text: "Set up your recruiter account" },
                { icon: <FaPencilAlt />, text: "Customize your company profile" },
                { icon: <FaRocket />, text: "Start posting jobs and connecting with candidates" },
              ].map((step, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-gray-600 mr-2">{step.icon}</span>
                  <span>{step.text}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 mb-4">Ready to enhance your recruitment capabilities?</p>
            <button 
              onClick={handleStart}
              className="bg-[#6A38C2] text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-md transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Begin Company Registration
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WelcomeScreen;
