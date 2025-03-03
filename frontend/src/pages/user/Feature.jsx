import React from "react";
import { FaUserCheck, FaChartLine, FaSearchDollar, FaComments, FaWallet, FaChartBar, FaBullseye } from "react-icons/fa";

const Feature = () => {
  return (
    <div>
      {/* Features & Benefits Section */}
      <div className="bg-gray-100 py-20" id="features">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          {/* Section Title */}
          <h2 className="text-4xl font-extrabold text-center text-blue-600">
             Why Choose Us?
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Take control of your finances with our smart solutions.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            {[
              {
                icon: <FaWallet className="text-5xl text-blue-500" />,
                title: "Smart Budgeting",
                desc: "Track and manage your income & expenses efficiently.",
              },
              {
                icon: <FaChartBar className="text-5xl text-green-500" />,
                title: "Expense Tracking",
                desc: "Get real-time insights into where your money is going.",
              },
              {
                icon: <FaBullseye className="text-5xl text-purple-500" />,
                title: "Investment Insights",
                desc: "Monitor and grow your financial portfolio smartly.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl text-center"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-b from-blue-500 to-blue-300 py-20 text-white">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-center">
            How It Works – Simple & Smart!
          </h2>  
          <p className="text-center text-lg mt-2">
            FinTrack makes financial management simple & efficient.
          </p>

          {/* Steps Section */}
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {[
              {
                id: "1",
                icon: <FaUserCheck className="text-4xl text-blue-600" />,
                title: "Sign Up Easily",
                desc: "Create an account in minutes & securely connect your financial data.",
              },
              {
                id: "2",
                icon: <FaChartLine className="text-4xl text-blue-600" />,
                title: "Analyze & Track",
                desc: "Get real-time insights into your expenses, income, and savings.",
              },
              {
                id: "3",
                icon: <FaSearchDollar className="text-4xl text-blue-600" />,
                title: "Optimize & Save",
                desc: "Identify spending patterns and optimize your budget.",
              },
              {
                id: "4",
                icon: <FaComments className="text-4xl text-blue-600" />,
                title: "Get Expert Advice",
                desc: "Connect with financial advisors to improve your financial health.",
              },
            ].map((step) => (
                <div
                key={step.id}
                className="bg-white p-6 rounded-lg shadow-lg text-center relative flex flex-col items-center">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 font-bold text-lg w-12 h-12 flex items-center justify-center rounded-full shadow-md border-2 border-blue-500">
                  {step.id}
                </div>
                <div className="mt-8 flex justify-center items-center">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mt-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 mt-2">{step.desc}</p>
              </div>
              
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
            {/* Section Title */}
            <h2 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-600">
            Hear From Our Happy Users
            </h2>
            <p className="text-lg text-center text-gray-600 mt-3">
            Real stories from people who transformed their finances with FinTrack.
            </p>

            {/* Testimonials Grid */}
            <div className="mt-12 grid md:grid-cols-2 gap-10">
            {[
                {
                name: "Alex Johnson",
                text: "FinTrack transformed how I manage my expenses!",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
                },
                {
                name: "Sarah Lee",
                text: "A must-have app for financial freedom.",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
                },
            ].map((user, index) => (
                <div
                key={index}
                className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl text-center"
                >
                <img
                    src={user.img}
                    alt={user.name}
                    className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 shadow-md"
                />
                <p className="mt-4 text-lg text-gray-700 font-medium">"{user.text}"</p>
                <span className="block mt-3 text-gray-500 font-semibold">{user.name}</span>
                </div>
            ))}
            </div>
      </div>
<br />
    
      {/* <div className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
           <h2 className="text-4xl font-bold text-center text-green-400">Get in Touch</h2>
           <p className="text-center text-gray-300 mt-4">Have questions? We're here to help!</p>
           <form className="mt-8 max-w-lg mx-auto">
             <input type="text" placeholder="Your Name" className="w-full p-3 mb-4 border border-gray-600 rounded"/>
             <input type="email" placeholder="Your Email" className="w-full p-3 mb-4 border border-gray-600 rounded"/>
             <textarea placeholder="Your Message" className="w-full p-3 border border-gray-600 rounded mb-4"></textarea>
             <button className="bg-green-500 text-white px-6 py-3 rounded-full w-full text-lg font-medium transition hover:bg-green-600">
               Send Message
             </button>
           </form>
         </div>
      </div> */}

    </div>

</div>
  );
};

export default Feature;
