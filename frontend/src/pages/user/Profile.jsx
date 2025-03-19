import React, { useState } from 'react';
import { User, CheckCircle, Star, Edit, Save } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addProfileAPI, profileAPI } from '../../services/userServices';
import { useFormik } from 'formik';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: addProfileAPI,
  });
  const { mutateAsync } = useMutation({
    mutationFn: profileAPI,
    mutationKey: ['edit-profile'],
  });

  const user = data?.user || {}; 

  const formik = useFormik({
    initialValues: {
      currencyPreference: user?.currencyPreference || 'INR',
      dob: user?.dob || '',
      phone: user?.phone || '', 
    },
    enableReinitialize: true, // Ensure values update when user data changes
    onSubmit: async (values) => {
      try {
        await mutateAsync(values);
        refetch();
        setIsEditing(false); // Exit edit mode after successful update
      } catch (error) {
        console.error("Error updating profile", error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
      </div>

      <div className="max-w-4xl mx-auto mt-6 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={48} className="text-gray-600" />
            </div>
            <div className="ml-6">
              <h3 className="text-2xl font-semibold text-gray-800">{user?.username || 'User Name'}</h3>
              <div className="flex items-center gap-2">
                {user?.verified && <CheckCircle size={20} className="text-green-500" title="Verified User" />} 
                {user?.subscribed && <Star size={20} className="text-yellow-500" title="Subscribed User" />} 
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600">
            {isEditing ? <Save size={16} /> : <Edit size={16} />} 
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Email</p>
            <p>{user?.email}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Date of Birth</p>
            {isEditing ? (
              <input 
                type="date" 
                name="dob" 
                value={formik.values.dob} 
                onChange={formik.handleChange} 
                className="border border-gray-300 rounded-md p-2"
              />
            ) : (
              <p>{user?.dob ? new Date(user.dob).toLocaleDateString() : 'Not set'}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Phone</p>
            {isEditing ? (
              <input 
                type="text" 
                name="phone" 
                value={formik.values.phone} 
                onChange={formik.handleChange} 
                className="border border-gray-300 rounded-md p-2"
              />
            ) : (
              <p>{user?.phone}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Currency Preference</p>
            {isEditing ? (
              <input 
                type="text" 
                name="currencyPreference" 
                value={formik.values.currencyPreference} 
                onChange={formik.handleChange} 
                className="border border-gray-300 rounded-md p-2"
              />
            ) : (
              <p>{user?.currencyPreference || 'Not set'}</p>
            )}
          </div>
          {isEditing && (
            <button 
              type="submit" 
              className="w-full bg-green-500 text-white py-2 rounded-md mt-4 hover:bg-green-600">
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
