import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

import { User } from '@/components/shared/Navbar';

import Axios from 'axios';
import Image from 'next/image';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: User;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
//const OPEN_AI_KEY = process.env.NEXT_PUBLIC_OPEN_AI_SECRET;

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, userData }) => {
    const [name, setName] = useState<string>(userData.fullName || '');
    const [email, setEmail] = useState<string>(userData.email || '');
    const [phoneNumber, setPhoneNumber] = useState<string>(userData.phoneNumber || '');
    const [skills, setSkills] = useState<string[]>(userData.skills || []);
    const [newSkill, setNewSkill] = useState<string>('');
    const [bio, setBio] = useState<string>(userData.bio || '');
    const [image, setImage] = useState<string>(
        userData?.profile ? `${API_URL}/${userData.profile}` : "https://via.placeholder.com/100"
    );


    //handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };



    const addSkill = () => {
        if (newSkill && !skills.includes(newSkill.toUpperCase())) {
            setSkills([...skills, newSkill.toUpperCase()]);
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const generateBio = () => {
        if (!name.trim()) {
            alert("Please enter your name before generating a bio.");
            return;
        }

        const predefinedSummaries = [
            `${name} is a skilled professional with expertise in ${skills.join(", ")}, known for delivering high-quality results.`,
            `With a strong background in ${skills.join(", ")}, ${name} is a dedicated and versatile professional.`,
            `${name} is an innovative professional with a strong command of ${skills.join(", ")}.`,
            `As an accomplished expert in ${skills.join(", ")}, ${name} has consistently demonstrated their ability to tackle complex challenges.`,
            `A results-oriented professional, ${name} excels in leveraging their expertise in ${skills.join(", ")} to deliver impactful solutions.`
        ];

        const randomIndex = Math.floor(Math.random() * predefinedSummaries.length);
        setBio(predefinedSummaries[randomIndex]);
    };






    //save to db
    const saveChanges = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("skills", JSON.stringify(skills));
        formData.append("bio", bio);

        //append profile image
        if (image instanceof File) {
            formData.append("profile", image);
        }

        try {
            const response = await Axios.put(`${API_URL}/api/users/update-userData/${email}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.status === 200) {
                alert("Profile updated successfully");
                onClose();
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-11/12 sm:max-w-md md:max-w-lg lg:max-w-xl">
                <DialogHeader className="flex justify-between">
                    <DialogTitle>Edit Profile</DialogTitle>
                   
                </DialogHeader>

                {/* User Image */}
                {/* User Image Preview */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border">
                        <img
                            src={image ? (typeof image === 'string' ? image : URL.createObjectURL(image)) : "https://via.placeholder.com/100"}
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* File Input to Change Image */}
                    <Input
                        accept="image/*"
                        type="file"
                        className="mt-2 w-15"
                        onChange={handleFileChange}

                    />
                   
                </div>


                {/* Edit Form */}
                <div className="space-y-3 mt-4">
                    <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Phone Number</label>
                        <Input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter your phone" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Skills</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center">
                                    {skill}
                                    <X className="w-4 h-4 ml-1 cursor-pointer" onClick={() => removeSkill(skill)} />
                                </span>
                            ))}
                        </div>
                        <div className="flex">
                            <Input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                                placeholder="Add a skill"
                                className="flex-grow"
                            />
                            <Button onClick={addSkill} className="ml-2">Add</Button>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Enter your bio"
                            className="w-full p-2 border rounded-md"
                            rows={4}
                        />
                        <Button onClick={generateBio} className="mt-2" variant="outline">Generate AI Bio</Button>
                    </div>
                </div>

                <DialogFooter className="flex justify-end mt-4">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button className="ml-2" onClick={saveChanges}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfileModal;
