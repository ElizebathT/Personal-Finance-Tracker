import React from "react";
import { LogOut, Users, BarChart, Settings, Home, Wallet } from "lucide-react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { FaBell, FaUserCircle, FaPowerOff } from "react-icons/fa";

import UserManagement from "./UserManagement";
import { useQuery } from "@tanstack/react-query";
import { dashboardAPI } from "../../services/adminServices";

const AdminDashboard = () => {
  const { data } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: dashboardAPI,
  });
  const users = data?.users || [];
  const userCount = users.length;

  const transactions = data?.transactions || []; 
  const totalIncome = transactions
    .filter(transaction => 
      transaction.type === 'income' 
    )
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  
  const transactionCount = transactions.length;
  const location = useLocation();

  // Page titles mapping
  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/user-management": "User Management",
    "/admin/reports": "Reports",
    "/admin/settings": "Settings",
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg flex flex-col p-5">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo-img.png" alt="Logo" className="h-6 w-6" />
            <h1 className="text-xl font-bold text-gray-800">Finance Admin</h1>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/admin"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/admin"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Home size={20} /> Dashboard
                </Link>
              </li>
              <li>
              <Link
                  to="/admin/user-management"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/admin/user-management"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
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
                <Link
                  to=""
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === ""
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <BarChart size={20} /> Reports
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === ""
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
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
  {/* Page Title */}
  <h2 className="text-xl font-semibold text-gray-800">
    {pageTitles[location.pathname]}
  </h2>

  {/* Right-side Icons */}
  <div className="flex items-center space-x-6">
    {/* Notifications Icon */}
    <button className="relative p-2 rounded-full hover:bg-gray-200 transition">
      <FaBell size={20} className="text-gray-700" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        3
      </span>
    </button>

    {/* User Profile Icon */}
    <button className="p-2 rounded-full hover:bg-gray-200 transition">
      <FaUserCircle size={22} className="text-gray-700" />
    </button>

    {/* Logout Button */}
    <Link to="/" className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition">
      <FaPowerOff size={20} className="text-white" />
    </Link>
  </div>
</nav>


        {/* Page Content */}
        <main className="flex-1 p-6 mt-16">
          {/* Dashboard Overview */}
          {location.pathname === "/admin" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-5 shadow-md rounded-lg flex items-center gap-4">
                <Wallet size={30} className="text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">Total Revenue</h3>
                  <p className="text-gray-500">${totalIncome}</p>
                </div>
              </div>

              <div className="bg-white p-5 shadow-md rounded-lg flex items-center gap-4">
                <Users size={30} className="text-green-500" />
                <div>
                  <h3 className="text-lg font-semibold">Active Users</h3>
                  <p className="text-gray-500">{userCount}</p>
                </div>
              </div>

              <div className="bg-white p-5 shadow-md rounded-lg flex items-center gap-4">
                <BarChart size={30} className="text-orange-500" />
                <div>
                  <h3 className="text-lg font-semibold">Total Transactions</h3>
                  <p className="text-gray-500">{transactionCount}</p>
                </div>
              </div>

              <div className="bg-white p-5 shadow-md rounded-lg flex items-center gap-4">
                <Settings size={30} className="text-purple-500" />
                <div>
                  <h3 className="text-lg font-semibold">System Uptime</h3>
                  <p className="text-gray-500">99.9%</p>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Page Routes */}
          <Routes>
            <Route path="/user-management" element={<UserManagement />} />
            <Route
              path="/reports"
              element={
                <div className="bg-white p-6 shadow-md rounded-lg">
                  Reports Content
                </div>
              }
            />
            <Route
              path="/settings"
              element={
                <div className="bg-white p-6 shadow-md rounded-lg">
                  Settings Content
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
