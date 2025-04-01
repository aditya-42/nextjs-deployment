import React, { useState } from "react";

const JobNotificationSignup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail(email)) {
      setSuccessMessage("You will be notified when new jobs are posted!");
      setError("");
      setEmail("");
    } else {
      setError("Please enter a valid email address.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="relative py-16 bg-gray-50 overflow-hidden">
      {/* Background Image */}
      <div
       className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
       style={{
       backgroundImage: `url('https://img.freepik.com/free-vector/abstract-white-halftone-background_23-2148013312.jpg?t=st=1739741323~exp=1739744923~hmac=1467e0316701374d6501891f11068f0c1935d695a60da829a2c1c164dd201ea0&w=740')`,
       }}
      ></div>


      <div className="relative max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-gray-800 z-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Get Notified About New Job Openings
        </h2>
        <p className="text-center text-lg mb-8 text-gray-600">
          Sign up to receive job alerts directly in your inbox whenever new jobs
          are posted. Stay ahead of the competition!
        </p>

        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg"
          >
            {/* Input Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-800"
              >
                Enter your email address:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full p-4 mt-2 rounded-lg text-gray-700 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="abc@gmail.com"
                required
              />
            </div>

          
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mt-2">{successMessage}</p>
            )}

        
            <button
              type="submit"
              className="w-full mt-4 py-3 text-lg font-semibold text-white bg-[#6A38C2] from-gray-700 to-gray-900 rounded-full hover:bg-[] transition-all duration-300 transform hover:scale-105"
            >
              Notify Me
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobNotificationSignup;
