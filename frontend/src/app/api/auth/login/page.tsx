"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"

//import { signIn } from "next-auth/react";





//importing Navbar
import Navbar from "../../../../components/shared/Navbar"

//footer
import Footer from "../../../../components/shared/Footer"

import Axios from "axios";


//import { notify } from "@/components/Notification/page"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";







const LogIn: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [role, setRole] = useState("");




  const notify = (message: string, type: "success" | "error" | "info" | "warning") => {
    toast(message, { type, autoClose: 1000, position: "top-right" });
  };



  //handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const response = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, { email, password });
      //console.log("api call has been made");



      //function to show recruiter page
      if (response.status === 200 && response.data.user.role == "applicant") {
        console.log("Toast should be triggered");

        notify("Login Successful as Applicant", "success");




        alert("Logged in successfully as Applicant");

        //getting data from backend
        const userEmail = response.data.user.email
        const userDetails = response.data.user;
        const authtoken = response.data.token;

        //save the data into localstorage
        localStorage.setItem("user", JSON.stringify(userDetails));
        localStorage.setItem("token", authtoken);
        localStorage.setItem('email', userEmail);

        //redirect to dashboard page
        window.location.href = "/";
        //console.log(userDetails, "Inside here");

      } else if (response.status == 200 && response.data.user.role == "recruiter") {
        console.log("I am inside the recruiter dashboard")
        alert("Logged in successfully as Recruiter");

        //getting data from backend
        const recruiterDetails = response.data.user;
        const authtoken = response.data.token;

        //save the data into localstorage
        localStorage.setItem("user", JSON.stringify(recruiterDetails));
        localStorage.setItem("token", authtoken);

        //redirect to dashboard page
        window.location.href = "/recruiter-portal/RecruiterHeroSection";
        console.log(recruiterDetails, "Inside Recruiter page");
      } else {
        window.location.href = "/admin";
        console.log("Admin page")

        const adminDetails  =  response.data.user;
        const authtoken = response.data.token
        console.log("Admin Details" , adminDetails)
        localStorage.setItem("user" , JSON.stringify(adminDetails))
        localStorage.setItem("token", authtoken);

      }


    } catch (error) {
      //alert("Invalid credentials. Please try again.");
      notify("Invalid Credentials", "error");
      console.error("Error in login:", error);

    }
  }

  
  return (
    <>

      <ToastContainer />
      <Navbar />

     
      <div className="flex item-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-black-200 rounded-md p-4 my-10"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-xl mb-5"> Login to your Account</h1>

          <div className="my-2">
            <Label className="font-bold">Email</Label>
            <Input type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}></Input>
          </div>

          <div className="my-2">
            <Label className="font-bold">Password</Label>
            <Input type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}>
            </Input>
          </div>
          <div className="flex items-center justfy-between">

          </div>

          <Button type="submit" className="w-full my-4 bg-[#6A38C2] hover:bg-[#5a2cbf]" >Log In</Button>





          <span className="text-sm">Don&apos;t have an account? <Link href="/api/auth/signup" className="text-blue-600"> Sign up</Link></span>

        </form>
      </div>

      <Footer />
    </>
  );
}


export default LogIn;
