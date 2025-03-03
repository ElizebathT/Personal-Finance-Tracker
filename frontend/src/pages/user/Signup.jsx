import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { registerUserAPI } from '../../services/userServices';
import { useFormik } from 'formik';
import { registerUserAction } from '../../redux/authSlice';
import { basicSchema } from '../../schema';

const SignupPage = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const { mutateAsync, isError, error, isPending, isSuccess } = useMutation({
    mutationFn: registerUserAPI,
    mutationKey: ['register-user'],
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { values, handleBlur, isSubmitting, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      email: '',
      dob: '',
      password: '',
    },
    validationSchema: basicSchema,
    
    onSubmit: async (values, action) => {
      try {
        const data = await mutateAsync(values);
        if (data?.token) {
          localStorage.setItem('userToken', data.token);
          dispatch(registerUserAction(data.token));
          setSuccessMessage('Signup Successful!');
          action.resetForm();
          navigate('/');
        } else {
          setSuccessMessage('Invalid response from server');
        }
      } catch (error) {
        console.error('Signup Error:', error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 pt-18">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border-t-4 border-blue-500">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>


        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your full username"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Date of Birth</label>
            <input
              type="date"
              name="dob"
              id="dob"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={values.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Create a password"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>

          <button
  type="submit"
  className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
>
  {isPending ? 'Signing up...' : 'Sign Up'}
</button>

        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 font-semibold hover:underline">
            Login here
          </a>
        </p>
        {isError && (
          <div className='alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto'>
            {error?.response?.data?.message || error.message || 'Something went wrong!'}
            {errors}
          </div>
        )}
        {isSuccess && (
          <div className='alert-box bg-green-100 text-green-800 border border-green-300 text-center max-w-lg p-5 rounded-lg mx-auto'>
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
