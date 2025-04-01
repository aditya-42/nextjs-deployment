"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

//import { router } from "next/navigation"


import { FcGoogle } from "react-icons/fc"

import Axios from "axios";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//oauth
import { signIn } from "next-auth/react"
// importing Navbar
import Navbar from "../../../../components/shared/Navbar";

// footer
import Footer from "../../../../components/shared/Footer";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter()
  // State to hold form data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [profile, setProfile] = useState(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);

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


  // Handle file selection
  const handleFileChange = (e) => {
    setProfile(e.target.files[0]); // Store the file object
  };


  //google singup
  // Fix for handleGoogleSignup function
const handleGoogleSignup = async () => {
  try {
    console.log("Starting OAuth")
    const result = await signIn("google", { 
      redirect: true, 
      callbackUrl: "/" 
    });
    
    console.log("signIn result:", result);

    const finalResult = await result

    console.log("Final Result" , finalResult)
    
    if (result?.error) {
      // Handle error case
      setToastMessage(result.error || "An error occurred during sign-in");
      setToastType("error");
    } else if (result?.ok) {
      // Handle success case
      console.log("Your result is " ,result)
      if (result.user?.email) {
        localStorage.setItem("email", result.user.email);

      }

   


      setToastMessage("Signed up and logged in successfully!");
      setToastType("success");
      
      // Redirect after successful login
      router.push(result.url || "/");
    } else {
      // Handle any other case
      setToastMessage("An unknown error occurred");
      setToastType("error");
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    setToastMessage("Failed to sign in with Google");
    setToastType("error");
  }
};


// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!profile) {
    toast.error("Please select a profile picture", { position: "top-right", autoClose: 3000 });
    return alert("Please select a profile picture");
  }

  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("email", email);
  formData.append("phoneNumber", phoneNumber);
  formData.append("password", password);
  formData.append("role", role);
  formData.append("profile", profile);

  try {
    const response = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/create-users`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);

    if (response.status === 201) {
      toast.success("User created successfully", { position: "top-right", autoClose: 3000 });
      alert("User created successfully");
      window.location.href = "/api/auth/login"; // Redirect to login page
      // localStorage.setItem('userData' , JSON.stringify({
      //   name: fullName,
      //   email : email,
      //   phoneNumber : phoneNumber
      // }));

    } else {
      toast.error("Failed to create user", { position: "top-right", autoClose: 3000 });
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      if (error.response.status === 400) {
        toast.error("User already exists with this email address.", { position: "top-right", autoClose: 3000 });
        alert("User already exists with this email address.");
      } else {
        toast.error("An error occurred. Please try again later.", { position: "top-right", autoClose: 3000 });
        alert("Server Error", error.message);
      }
    }
    else {
      alert("An error occurred. Please try again later. " + error.message);
    }

  }
};

return (
  <div className="flex flex-col min-h-screen">
    {/* Navbar */}
    <Navbar />

    <ToastContainer />

    {/* Main Content */}
    <div className="flex-grow flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 border border-black-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5">Sign Up</h1>

        <div className="my-2">
          <Label className="font-bold">Full Name</Label>
          <Input
            type="text"
            placeholder="Enter Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="my-2">
          <Label className="font-bold">Email</Label>
          <Input
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-2">
          <Label className="font-bold">Phone Number</Label>
          <Input
            type="tel"
            placeholder="Enter Number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="my-2">
          <Label className="font-bold">Password</Label>
          <Input
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Radio Buttons for Role Selection */}
        <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="applicant"
                className="cursor-pointer"
                onChange={(e) => setRole(e.target.value)}
              />
              <Label>Applicant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="recruiter"
                className="cursor-pointer"
                onChange={(e) => setRole(e.target.value)}
              />
              <Label>Recruiter</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Profile Picture Upload */}
        <div>
          <Label>Profile</Label>
          <Input
            accept="image/*"
            type="file"
            className="cursor-pointer"
            onChange={handleFileChange}
          />
        </div>

        <Button type="submit" className="w-full my-4 bg-[#6A38C2] hover:bg-[#5a2cbf]">
          Signup
        </Button>

        {/* <Button
            type="button"
            onClick={() => signIn("google")}
            className="w-full my-2 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-2 rounded-lg shadow-md"
          >
            <FcGoogle size={20} />
            Sign up with Google
          </Button> */}
        <Button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full my-2 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-2 rounded-lg shadow-md"
        >
          <FcGoogle size={20} />
          Sign up with Google
        </Button>



        <span className="text-sm">
          Already have an account?{" "}
          <Link href="/api/auth/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>

    {/* Footer */}
    <Footer />
  </div>
);
}
