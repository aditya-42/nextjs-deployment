// "use client";

// import React, { useState, useEffect } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface EditProfileModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (newUsername: string, newProfilePic: File | null) => void;
//   currentUsername: string;
//   currentProfile: string; 
// }

// const API_URL = process.env.NEXT_PUBLIC_API_URL?.endsWith("/")
//   ? process.env.NEXT_PUBLIC_API_URL
//   : process.env.NEXT_PUBLIC_API_URL + "/";

// const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, onSave, currentUsername, currentProfile }) => {
//   const [username, setUsername] = useState(currentUsername || "");
//   const [profilePic, setProfilePic] = useState<File | null>(null);

//   // present correct modal instead of the previous one
//   useEffect(() => {
//     console.log("🚀 EditProfileModal - currentProfile:", currentProfile);
//     setUsername(currentUsername || "");
//     setProfilePic(null); 
//   }, [isOpen, currentUsername, currentProfile]); // listen `currentProfile`
  
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setProfilePic(event.target.files[0]);
//     }
//   };

//   const cleanedProfile = currentProfile.startsWith("http") 
//   ? currentProfile 
//   : `${API_URL.replace(/\/$/, "")}/${currentProfile.replace(/^\/+/, "").replace(/\\/g, "/")}`;

//   console.log("🚀 Final cleanedProfile URL (Fixed):", cleanedProfile);




//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-lg p-6">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
//         </DialogHeader>

//         {/* Profile Picture Upload */}
//         <div className="flex flex-col items-center gap-4">
//           <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileUpload" />
//           <label htmlFor="fileUpload" className="cursor-pointer">
//             {profilePic ? (
//               <img 
//                 src={URL.createObjectURL(profilePic)} 
//                 alt="Preview" 
//                 className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
//               />
//             ) : currentProfile ? (
//               <img 
//                 src={cleanedProfile} 
//                 alt="Profile" 
//                 className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
//               />
//             ) : (
//               <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
//                 No Image
//               </div>
//             )}
//           </label>

//           {/* Username Input */}
//           <Input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//             placeholder="Enter new username"
//           />
//         </div>

//         <DialogFooter className="flex justify-end gap-4 mt-4">
//           <Button variant="outline" onClick={onClose} className="px-6 py-2 rounded-lg">
//             Cancel
//           </Button>
//           <Button onClick={() => onSave(username, profilePic)} className="px-6 py-2 rounded-lg bg-[#6A38C2] text-white">
//             Confirm
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EditProfileModal;

