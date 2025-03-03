import React, { useState } from 'react';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !dob || !password) {
      setError('All fields are required.');
      return;
    }

    console.log('Signing up with:', { name, email, dob, password });
    // Add API call here if needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 pt-22">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border-t-4 border-blue-500">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Date of Birth</label>
            <input
              type="date"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 font-semibold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
