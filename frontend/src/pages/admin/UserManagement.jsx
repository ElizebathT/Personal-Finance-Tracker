import React, { useState } from "react";
import { FaUserPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, BarChart, Settings } from "lucide-react";

const UserManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const pageTitles = {
    "/admin/user-management": "User Management",
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg flex flex-col p-5">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <img src="/logo-img.png" alt="Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold text-gray-800">Finance Admin</h1>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/admin"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/admin" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <Home size={20} /> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/user-management"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/admin/user-management" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <Users size={20} /> User Management
                </Link>
              </li>

              <li>
              <Link
                  to="/admin/feedback-support"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/admin/feedback-support"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Users size={20} /> Feedback & Support
              </Link>

              </li>

              <li>
                <Link to="/admin" className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <BarChart size={20} /> Reports
                </Link>
              </li>
              <li>
                <Link to="/admin" className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Settings size={20} /> Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="w-full py-4 px-6 bg-white/80 backdrop-blur-md shadow-md flex justify-between items-center fixed top-0 left-72 right-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {pageTitles[location.pathname]}
          </h2>

          {/* Right-side Icons */}
          <div className="flex items-center space-x-6">
            <button className="relative p-2 rounded-full hover:bg-gray-200 transition">
              <FaSearch size={20} className="text-gray-700" />
            </button>
            <Link to="/" className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition">
              <FaTimes size={20} className="text-white" />
            </Link>
          </div>
        </nav>

        {/* User Management Content */}
        <main className="flex-1 p-6 mt-16">
          <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            {/* <div className="flex justify-between items-center mb-6"> */}
              {/* <h2 className="text-2xl font-semibold text-gray-800">User Management</h2> */}
              {/* <button 
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                onClick={() => setShowModal(true)}
              >
                <FaUserPlus /> Add User
              </button> */}
            {/* </div> */}

            {/* Search & Filter Section */}
            <div className="flex justify-between bg-white p-4 shadow-md rounded-lg mb-4">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="px-4 py-2 border rounded-md w-64 focus:ring focus:ring-blue-300"
                />
                <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">
                  <FaSearch />
                </button>
              </div>
              <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
                <FaFilter /> Filter
              </button>
            </div>

            {/* User Table */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
