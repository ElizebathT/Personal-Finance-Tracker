import React from 'react'
import AboutUs from "../../assets/about-us.jpg";

const About = () => {
  return (
    <div>
    <div>
        <div 
              className="bg-gradient-to-b from-blue-100 to-white text-gray-900 py-20" 
              id="about">
              <div className="container mx-auto px-8 md:px-16 lg:px-24">
                {/* Section Title */}
                <h2 className="text-4xl font-extrabold text-center text-blue-600">
                  About Us
                </h2>
                <br/>
        
                {/* Content Section */}
                <div className="flex flex-col md:flex-row items-center md:space-x-12">
                  {/* Image Section */}
                  <div className="md:w-1/2">
                    <img 
                      src={AboutUs} 
                      alt="About FinTrack" 
                      className="w-full h-80 rounded-lg object-cover shadow-lg border border-blue-200"
                    />
                  </div>
        
                  {/* Text Content */}
                  <div className="md:w-1/2 text-center md:text-left">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      At <span className="text-green-500 font-semibold">FinTrack</span>, we believe that financial management 
                      should be **simple, smart, and stress-free**. Whether you're budgeting, 
                      tracking expenses, or managing investments, our platform provides 
                      the tools you need to **gain full control** of your finances.
                    </p>
                    
                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                      Our mission is to empower individuals and businesses to make 
                      **informed financial decisions** with real-time insights and powerful analytics. 
                      With a secure, easy-to-use interface, FinTrack ensures you stay ahead 
                      in your financial journey.
                    </p>
        
                    {/* Call to Action Button */}
                    <div className="mt-6">
                        <button className="border border-teal-500 text-teal-500 px-6 py-3 rounded-full text-lg font-medium transition duration-300 hover:bg-teal-500 hover:text-white shadow-md">
                            Learn More
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>
    </div>
  )
}

export default About