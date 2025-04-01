import React from 'react';
import Slider from 'react-slick';

// Company logos data
const companies = [
"https://imgs.search.brave.com/cMeR-TEzSzc3L_T_t4c0ZKSZu5B4BxkMPGrZ48urikE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZ29vZ2xlLXMt/bG9nby8xNTAvR29v/Z2xlX0ljb25zLTA5/LTUxMi5wbmc",
  "https://imgs.search.brave.com/qvsCDrqd4VNPePBUsLJ6HnEc0NXizeYOPGBIjAclGus/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/ZHlubWVkaWEtMS5t/aWNyb3NvZnQuY29t/L2lzL2ltYWdlL21p/Y3Jvc29mdGNvcnAv/UldDWkVSLUxlZ2Fs/LUlQLVRyYWRlbWFy/a3MtQ1AtTVMtbG9n/by03NDB4NDE3LTE_/d2lkPTQwNiZoZWk9/MjMwJmZpdD1jcm9w",
  "https://imgs.search.brave.com/1bhL6ufZamxoV5Ikhs9IXvQoGD4DPumk9Nh2polNLQ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzEw/L0FwcGxlX2xvZ29f/Z3JleS02MjR4NDAw/LnBuZw",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
 
];

const CompaniesSection: React.FC = () => {
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite loop
    speed: 500, // Speed of the transition
    slidesToShow: 4, // Show 4 logos at a time
    slidesToScroll: 1, // Scroll one logo at a time
    autoplay: true, // Automatically slide
    autoplaySpeed: 3000, // Delay between slides (in milliseconds)
    centerMode: true, // Centers the current slide
    focusOnSelect: true, // Focuses on the selected item
    responsive: [
      {
        breakpoint: 1024, // For larger screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // For tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // For mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Companies Who Recruit From Us
        </h2>

        <Slider {...settings}>
          {companies.map((logo, index) => (
            <div key={index} className="flex justify-center items-center mx-2">
              <div className="w-24 h-24 bg-white shadow-lg rounded-full flex justify-center items-center p-2 hover:scale-110 transition-transform duration-300">
                <img
                  src={logo}
                  alt={`Company ${index}`}
                  className="object-contain w-full h-full rounded-full"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CompaniesSection;
