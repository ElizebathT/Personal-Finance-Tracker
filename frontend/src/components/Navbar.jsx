import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
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
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/about" className="hover:text-gray-400">About</Link>
          <Link to="/features" className="hover:text-blue-400">Services</Link>
        </div>

        {/* Get Started Button (Desktop) */}
        <Link to="/login">
          <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white hidden md:inline transform transition-transform duration-300 hover:scale-105 px-4 py-2 rounded-full">
            Get Started
          </button>
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black text-white flex flex-col items-center space-y-4 py-4">
          <Link to="/" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/features" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/login">
            <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white hidden md:inline transform transition-transform duration-300 hover:scale-105 px-4 py-2 rounded-full">
              Get Started
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
