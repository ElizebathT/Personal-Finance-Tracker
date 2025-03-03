import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaBars, FaTimes, FaUserCircle, FaBell ,FaPowerOff } from "react-icons/fa"; // Make sure you import FaBell

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white fixed top-0 left-0 w-full h-18 z-50 px-6 md:px-16 lg:px-24 shadow-md">
      <div className="container mx-auto py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center space-x-1">
          <img 
            src="/logo-img.png"
            alt="FinTrack Logo" 
            className="w-10 h-7 object-contain" 
          />
          <div className="text-2xl font-bold">FinTrack</div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="hover:text-gray-400">Home</Link>
          <Link to="/transactions" className="hover:text-gray-400">Transactions</Link>
          <Link to="/budget" className="hover:text-gray-400">Budget</Link>
          <Link to="/savings" className="hover:text-gray-400">Savings</Link>
          <Link to="/reports" className="hover:text-gray-400">Reports</Link>
          
          {/* Notification Icon */}
          <div className="relative">
            <FaBell className="text-2xl hover:text-gray-400 cursor-pointer" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </div>
          
          {/* Profile Icon */}
          <Link to="/profile">
            <FaUserCircle className="text-2xl hover:text-gray-400 cursor-pointer" />
          </Link>
         
          <Link to="/" className="text-xl  hover:text-blue-400 cursor-pointer pt-1">
            <FaPowerOff /> {/* Logout Icon (Power Off) */}
          </Link>

          {/* <Link to="/settings" className="hover:text-gray-400">Settings</Link>
          <Link to="/logout" className="hover:text-gray-400">Logout</Link> */}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black text-white flex flex-col items-center space-y-4 py-4">
          <Link to="/dashboard" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/profile" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Profile</Link>
          <Link to="/settings" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Settings</Link>
          <Link to="/logout" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Logout</Link>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
