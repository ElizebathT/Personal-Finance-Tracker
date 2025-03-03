import React from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import QRCode from "react-qr-code";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-gray-300 py-16">
    <div className="container mx-auto px-8 md:px-16 lg:px-24 grid md:grid-cols-5 gap-10">
      
      {/* Company Info */}
      <div>
        <h3 className="text-3xl font-bold text-white">FinTrack</h3>
        <p className="mt-3 text-gray-400">
          Empowering you to make smarter financial decisions with ease.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-lg font-semibold text-white">Quick Links</h4>
        <ul className="mt-3 space-y-2">
          {["About Us", "Features", "Pricing", "FAQs"].map((link, index) => (
            <li key={index}>
              <a href="#" className="hover:text-yellow-400 transition">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h4 className="text-lg font-semibold text-white">Resources</h4>
        <ul className="mt-3 space-y-2">
          {["Blog", "Support", "Community"].map((resource, index) => (
            <li key={index}>
              <a href="#" className="hover:text-yellow-400 transition">
                {resource}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Details */}
      <div>
        <h4 className="text-lg font-semibold text-white">Contact Us</h4>
        <ul className="mt-3 space-y-3 text-gray-400">
          <li className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-yellow-400" /> 123 Finance St, New York, USA
          </li>
          <li className="flex items-center gap-2">
            <FaPhone className="text-yellow-400" /> +91 7281912701
          </li>
          <li className="flex items-center gap-2">
            <FaEnvelope className="text-yellow-400" /> support@fintrack.com
          </li>
        </ul>
      </div>

      {/* QR Code */}
      <div className="text-center">
        <h4 className="text-lg font-semibold text-white">Scan & Download</h4>
        <div className="mt-4 bg-white p-2 inline-block rounded-lg shadow-lg">
          <QRCode value="https://fintrack.com" size={100} />
        </div>
      </div>
    </div>

    {/* Newsletter Subscription */}
    <div className="mt-12 border-t border-gray-700 pt-6 text-center">
      <h4 className="text-xl font-semibold text-white">Subscribe to Our Newsletter</h4>
      <p className="text-gray-400 text-sm mt-2">Stay updated with the latest financial insights and news.</p>
      <div className="mt-4 flex justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-64 p-3 rounded-l-lg border-none focus:ring-2 focus:ring-yellow-400 text-black"
        />
        <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-r-lg font-medium hover:bg-yellow-500 transition">
          Subscribe
        </button>
      </div>
    </div>

    {/* Social Media & Copyright */}
    <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-700 pt-6">
      <div className="flex justify-center space-x-4">
      {[
          { icon: <FaFacebook className="text-blue-600" />, link: "#" },
          { icon: <FaTwitter className="text-blue-400" />, link: "#" },
          { icon: <FaLinkedin className="text-blue-700" />, link: "#" },
          { icon: <FaInstagram className="text-pink-500" />, link: "#" },
      ].map((social, index) => (
          <a key={index} href={social.link} className="hover:opacity-75 transition text-2xl">
          {social.icon}
          </a>
      ))}
      </div>

      <p className="mt-4">&copy; {new Date().getFullYear()} FinTrack. All rights reserved.</p>
    </div>
  </footer>

  )
}

export default Footer