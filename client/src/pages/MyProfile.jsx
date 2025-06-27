import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FiUpload, FiUser, FiMail, FiPhone, FiHome, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { token } = useContext(ShopContext);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    photo: null,
  });

  const fileInputRef = useRef(null);

  // Load saved profile from localStorage
  useEffect(() => {
    if (token) {
      const saved = localStorage.getItem(`profile_${token}`);
      if (saved) {
        setProfileData(JSON.parse(saved));
      }
    }
  }, [token]);

  // Handle changes to input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile image upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error("Image size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save to localStorage
  const handleSave = () => {
    if (!token) return;
    localStorage.setItem(`profile_${token}`, JSON.stringify(profileData));
    toast.success("Profile saved successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">My Profile</h2>

      {/* Profile Photo */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div className="relative w-32 h-32 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-200">
          {profileData.photo ? (
            <img 
              src={profileData.photo} 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <FiUser className="w-10 h-10" />
              <span className="text-xs mt-2">No Photo</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <FiUpload className="w-4 h-4" />
            Upload Photo
          </button>
          <p className="text-xs text-gray-500">JPG, PNG (Max 2MB)</p>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-6">
        <div className="relative">
          <label className="block text-sm text-gray-600 mb-1">Full Name</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm text-gray-600 mb-1">Email Address</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="+1 (123) 456-7890"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm text-gray-600 mb-1">Address</label>
          <div className="relative">
            <FiHome className="absolute left-3 top-4 text-gray-400" />
            <textarea
              name="address"
              value={profileData.address}
              onChange={handleChange}
              rows={3}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="123 Main St, City, Country"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <FiSave className="w-5 h-5" />
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;