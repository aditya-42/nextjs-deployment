"use client";
import { useState, useEffect } from "react";
import { FaUser, FaBuilding, FaLock } from "react-icons/fa";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

//import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Axios from "axios";

const RecruiterForm = () => {
  const [step, setStep] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType] = useState<"success" | "error" | null>(null);
  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companyEmail: "",
    companySize: "",
    companyPhoneNumber: "",
    location: "",
    companyDescription: "",
    fullName: "",
    jobTitle: "",
    workEmail: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    profile: "",
    acceptTerms: false,
  });



  useEffect(() => {
    if (toastMessage) {
      toast[toastType || "info"](toastMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setToastMessage(null);
    }
  }, [toastMessage, toastType]);

  const notify = (message: string, type: "success" | "error" | "info" | "warning") => {
    toast(message, { type, autoClose: 1000, position: "top-right" });
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value });
  };

  //handle file change
  const handleFileChange = (e) => {
    setProfile(e.target.files[0]);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);



  //confirmation email
  const sendConfirmationEmail = async()=>{
    console.log("I am inside the confirmation")
    console.log(formData.workEmail)

        if (formData.workEmail) {
            try {
                // Make an API call to send the email with the meeting link
                const response = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/company/send-confirmation-email`, {
                    companyEmail: formData.companyEmail,
                });

              

                if (response.status === 200) {
                    alert("Send Successfully");
                } else {
                    alert('Failed to send confirmation');
                }

               
            } catch (error) {
                console.error('Error sending confirmation', error);
                alert('Failed to send confirmation');
            }
        } 
    };


  //save data to db
  const saveDatatoDB = async (e) => {

    console.log("I am in function")
    e.preventDefault();

    if (!profile) {
      toast.error("Please select a profile picture", { position: "top-right", autoClose: 3000 });
      return alert("Please select a profile picture");
    }
    const formDataToSend = new FormData();
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("industry", formData.industry);
    formDataToSend.append("companyEmail", formData.companyEmail);
    formDataToSend.append("companySize", formData.companySize);
    formDataToSend.append("companyPhoneNumber", formData.companyPhoneNumber);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("companyDescription", formData.companyDescription);
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("jobTitle", formData.jobTitle);
    formDataToSend.append("workEmail", formData.workEmail);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("confirmPassword", formData.confirmPassword);

    // Append the file to the FormData object
    if (profile) {
      formDataToSend.append("profile", profile);
    } else {
      alert("Please select a profile image.");
      return;
    }


    //api call

    try {
      const response = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/company/create-company`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      if (response.status === 201) {
        notify("Company Registered Successsfully", "success");
        console.log("Data has been saved to db");
        window.location.href = "/admin/confirmation";

        //send confirmation email
        sendConfirmationEmail(formData.companyEmail);

      } else {
        notify("Company Registration Failed", "error");
      }

    } catch (error) {
      if (error.response) {
       
        console.error("Server responded with an error:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // An error occurred in setting up the request
        console.error("Error setting up the request:", error.message);
      }
      console.error("Config:", error.config);
    }


  };

  const renderStepIcon = (stepNumber: number, icon: React.ReactNode) => (
    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= stepNumber ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-600"}`}>
      {icon}
    </div>
  );

  return (

    <>
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Company Registration</h2>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col items-center">
            {renderStepIcon(1, <FaBuilding />)}
            <span className="mt-2 text-sm">Company</span>
          </div>
          <div className={`flex-1 h-1 ${step > 1 ? "bg-indigo-600" : "bg-gray-300"}`}></div>
          <div className="flex flex-col items-center">
            {renderStepIcon(2, <FaUser />)}
            <span className="mt-2 text-sm">Personal</span>
          </div>
          <div className={`flex-1 h-1 ${step > 2 ? "bg-indigo-600" : "bg-gray-300"}`}></div>
          <div className="flex flex-col items-center">
            {renderStepIcon(3, <FaLock />)}
            <span className="mt-2 text-sm">Account</span>
          </div>
        </div>

        <form className="space-y-6">
          {/* Step 1: Recruiter Details */}
          {step === 1 && (
            <div className="space-y-4">
              <InputField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />

              <SelectField label="Industry" name="industry" value={formData.industry} onChange={handleChange} options={["IT", "Healthcare", "Finance", "Other"]} />
              <InputField label="Company Email" name="companyEmail" value={formData.companyEmail} onChange={handleChange} />
              <div className="mb-4">
                <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-700">
                  Company Logo
                </label>
                <input
                  accept="image/*"
                  type="file"
                  name="profile"
                  onChange={handleFileChange}


                  className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <InputField label="Company Size"  type="number" name="companySize" value={formData.companySize} onChange={handleChange} />
              <InputField label="Company Phone Number" type="number" name="companyPhoneNumber" value={formData.companyPhoneNumber} onChange={handleChange} />
              <InputField label="Location" name="location" value={formData.location} onChange={handleChange} />
              <TextAreaField label="Company Description" name="companyDescription" value={formData.companyDescription} onChange={handleChange} />


            </div>
          )}

          {/* company owner  */}
          {step === 2 && (
            <div className="space-y-4">
              <InputField label="CEO Name" name="fullName" value={formData.fullName} onChange={handleChange} />
              <InputField label="Position" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
              <InputField label="Work Email" name="workEmail" value={formData.workEmail} onChange={handleChange} />
              <InputField label="Phone Number" name="phoneNumber" type="number" value={formData.phoneNumber} onChange={handleChange} />

            </div>
          )}

          {/* Step 3: Account & Verification */}
          {step === 3 && (
            <div className="space-y-4">
              <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
              <InputField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
              <div className="flex items-center">
                <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} className="mr-2" required />
                <span>I agree to the Terms & Conditions</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-400 transition duration-300">
                Back
              </button>
            )}
            {step < 3 ? (
              <button type="button" onClick={nextStep} className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
                Next
              </button>
            ) : (
              <button type="submit" onClick={saveDatatoDB} className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select name={name} value={value} onChange={onChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea name={name} value={value} onChange={onChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" rows={4}></textarea>
  </div>
);

export default RecruiterForm;
