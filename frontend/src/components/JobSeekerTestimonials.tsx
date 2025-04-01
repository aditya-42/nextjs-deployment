import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import arrow icons
import Image from 'next/image';

const JobSeekerTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Sample companies and roles
  const companies = ['TechCorp', 'InnovateX', 'Web Solutions', 'DevBridge', 'Pixel Studios' , 'DataCo'];
  const roles = ['Frontend Developer', 'Backend Engineer', 'UI/UX Designer', 'Product Manager', 'Full Stack Developer' , 'Data Scientist'];

  // Sample feedbacks
  const feedbackMessages = [
    "I found my dream job through this platform. The process was easy, and I got the perfect match for my skills!",
    "The job search process was seamless, and I was able to land a role that fits my career goals.",
    "Thanks to this platform, I found a great company with an amazing work culture!",
    "I received interview calls from top companies, and it helped me boost my career!",
    "The platform's filters helped me find the best job for my skill set quickly and efficiently.",
    "The platform's filters helped me find the best job for my skill set quickly and efficiently."
  ];

  useEffect(() => {
    // Fetch random user data for avatars
    const fetchRandomUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=5');
        const data = await response.json();
        setTestimonials(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching random users:', error);
        setLoading(false);
      }
    };

    fetchRandomUsers();

    // Auto-change testimonials every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % testimonials.length);
    }, 8000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 3
    );
  };

  // Get the testimonials to be displayed
  const displayedTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-gray-800 text-center">What Job Seekers Say</h2>
      <p className="text-gray-500 text-center mt-2">
        Hear from people who found their perfect jobs!
      </p>

      {/* Testimonials Carousel */}
      <div className="relative flex justify-center mt-8">
        <div className="flex gap-4">
          {displayedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-5 rounded-2xl border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col items-center w-[32%]"
            >
              <img
                src={testimonial.picture.large}
                alt={testimonial.name.first}
                className="rounded-full w-24 h-24 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {testimonial.name.first} {testimonial.name.last}
              </h3>
              <p className="text-sm text-gray-500">{roles[index]}</p>
              <p className="text-sm text-gray-500 mb-4">{companies[index]}</p>
              <p className="text-gray-600">{feedbackMessages[index]}</p>
            </div>
          ))}
        </div>

        {/* Left and Right Arrows for Navigation */}
        <div
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#6A38C2] cursor-pointer hover:text-[#5a2cbf] transition"
        >
          <ChevronLeft className="h-8 w-8" />
        </div>
        <div
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-[#6A38C2] cursor-pointer hover:text-[#5a2cbf] transition"
        >
          <ChevronRight className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default JobSeekerTestimonials;
