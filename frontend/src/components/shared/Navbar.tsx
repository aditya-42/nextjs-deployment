"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Edit2, MoreHorizontal, Menu, X, User } from "lucide-react";
//import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
//import { Input } from "@/components/ui/input";

// Import the new EditProfileModal
import EditProfileModal from '../../components/EditProfileModal/page'; 

export interface User {
  fullname: string;
  role: "recruiter" | "applicant" | "admin";
  profile?: string;
  email?: string;
  skills?: string[];
  bio?: string;
  image?: string;
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userDetails && token) {
      setUser(JSON.parse(userDetails));
    }
  }, []);



  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
        method: "POST",
      });
  
      if (response.ok) {
        console.log("Logout successful");
        setUser(null);
        localStorage.removeItem("user");
        router.push("/api/auth/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  

  const isActive = (path: string) =>
    pathname === path ? "text-[#6A38C2] font-semibold border-b-2 border-[#6A38C2]" : "text-gray-600";

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-6 lg:px-8">
          {/* Logo */}
          <Link href={user?.role === "recruiter" ? "/recruiter-portal/RecruiterHeroSection" : "/"} className="text-3xl font-bold text-[#F83002]">
            Hire<span className="text-black">Ease</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6 font-medium">
              {user?.role === "recruiter" ? (
                <>
                  <li>
                    <Link href="/recruiter-portal/jobposting-welcome" className={`text-lg hover:text-[#6A38C2] transition duration-200 ${isActive("/recruiter-portal/jobposting-welcome")}`}>
                      Post a Job
                    </Link>
                  </li>
                  <li>
                    <Link href="/recruiter-portal/getAllJobs" className={`text-lg hover:text-[#6A38C2] transition duration-200 ${isActive("/recruiter-portal/getAllJobs")}`}>
                      Manage Applications
                    </Link>
                  </li>
                  <li>
                    <Link href="/recruiter-portal/dashboard" className={`block text-lg ${isActive("/recruiter-portal/dashboard")}`}>
                      Analytics
                    </Link>
                  </li>
                  <li>
                  <Link href="/recruiter-portal/calendarEvent" className={`block text-lg ${isActive("/recruiter-portal/calendarEvent")}`}>
                     Calendar
                    </Link>
                  </li>
                </>
              ) : user?.role === "applicant" ? (
                <>
                  <li>
                    <Link href="/" className={`text-lg hover:text-[#6A38C2] transition duration-200 ${isActive("/")}`}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/jobposting" className={`text-lg hover:text-[#6A38C2] transition duration-200 ${isActive("/jobposting")}`}>
                      Browse Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="/user-profile" className={`text-lg hover:text-[#6A38C2] transition duration-200 ${isActive("/user-profile")}`}>
                      My Applications
                    </Link>
                  </li>
                  <li>
                    {/* <Link href="/" className={`text-lg hover:text-[#6A38C2] transition duration-200 ${isActive("/resume-builder")}`}>
                                            Resume Builder
                                        </Link> */}
                  </li>
                </>
              ) : null}

              {!user && (
                <>
                  <li>
                    <Link href="/jobposting" className={`block text-lg ${isActive("/jobposting")}`}>
                      Browse Jobs
                    </Link>
                  </li>

                  <li>
                    <Link href="/company-registration/dashboard" className={`block text-lg ${isActive("/company-registration/dashboard")}`}>
                      Register Company
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* User Actions */}
            {!user ? (
              <div className="flex items-center gap-3">
                <Link href="/api/auth/login">
                  <Button className="bg-[#6A38C2]">Login</Button>
                </Link>
                <Link href="/api/auth/signup">
                  <Button className="bg-[#6A38C2]">Signup</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-12">
                  <AvatarImage
                    src={`${API_URL}/${user.profile}`}
                    className="object-cover w-full h-full"
                  />
                </Avatar>

                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      className="flex items-center gap-2 w-fit cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <Edit2 className="w-4" />
                      <span>Edit Profile</span>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button className="bg-[#6A38C2] text-white flex items-center gap-2" onClick={handleLogout}>
                  <LogOut />
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <ul className="flex flex-col p-4 space-y-4">
              {user?.role === "recruiter" ? (
                <>
                  <li>
                    <Link href="/recruiter-portal/jobposting-welcome" className={`block text-lg ${isActive("/recruiter-portal/jobposting-welcome")}`}>
                      Post a Job
                    </Link>
                  </li>
                  <li>
                    <Link href="/recruiter-portal/getAllJobs" className={`block text-lg ${isActive("/recruiter-portal/getAllJobs")}`}>
                      Manage Applications
                    </Link>
                  </li>
                  <li>
                    <Link href="/recruier-portal/dashboard" className={`block text-lg ${isActive("/")}`}>
                      Analytics
                    </Link>
                  </li>
                  <Avatar>
                    <AvatarImage src={`${API_URL}/${user.profile}`} />
                  </Avatar>
                </>
              ) : user?.role === "applicant" ? (
                <>
                  <li>
                    <Link href="/" className={`block text-lg ${isActive("/")}`}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/jobposting" className={`block text-lg ${isActive("/jobposting")}`}>
                      Browse Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="/user-profile" className={`block text-lg ${isActive("/user-profile")}`}>
                      My Applications
                    </Link>
                  </li>
                  <li>
                    <Link href="/resume-builder" className={`block text-lg ${isActive("/")}`}>
                      Resume Builder
                    </Link>
                  </li>
                </>
              ) : null}

              {!user && (
                <div>
                  <li>
                    <Link href="/jobposting" className={`block text-lg ${isActive("/jobposting")}`}>
                      Browse Jobs
                    </Link>
                  </li>

                  <li>
                    <Link href="/company-registration/dashboard" className={`block text-lg ${isActive("/company-registration/dashboard")}`}>
                      Register Company
                    </Link>
                  </li>
                </div>
              )}

              {!user ? (
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="/api/auth/login">
                    <Button className="w-full bg-[#6A38C2]">Login</Button>
                  </Link>
                  <Link href="/api/auth/signup">
                    <Button className="w-full bg-[#6A38C2]">Signup</Button>
                  </Link>
                </div>
              ) : (
                <Button className="w-full bg-[#6A38C2] mt-4" onClick={handleLogout}>
                  <LogOut className="mr-2" />
                  Logout
                </Button>
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* Render the EditProfileModal */}
      {user && (
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userData={user}
          
        />
      )}
    </>
  );
};

export default Navbar;
