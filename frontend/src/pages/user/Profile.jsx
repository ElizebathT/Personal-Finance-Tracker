import React, { useState } from 'react';
import { User } from 'lucide-react'; // Profile icon

const UserProfile = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
      </div>

      {/* Profile Information Section */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
            <User size={48} className="text-gray-600" /> {/* Profile Icon */}
          </div>
          <div className="ml-6">
            <h3 className="text-2xl font-semibold text-gray-800">User Name</h3>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-6">
          {/* Name */}
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Name</p>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Email</p>
          </div>

          {/* Password */}
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Password</p>
          </div>

          {/* Currency Preference */}
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Currency Preference</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
