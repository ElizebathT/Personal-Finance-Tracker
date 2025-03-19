import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { registerUserAPI } from '../../services/userServices';
import { useFormik } from 'formik';
import { registerUserAction } from '../../redux/authSlice';
import { basicSchema } from '../../schema';

const SignupPage = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutateAsync, isError, error, isPending, isSuccess } = useMutation({
    mutationFn: registerUserAPI,
    mutationKey: ['register-user'],
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      dob: '',
      password: '',
      phone: ''
    },
    validationSchema: basicSchema,
    onSubmit: async (values, actions) => {
      try {
        const data = await mutateAsync(values);
        if (data?.token) {
          localStorage.setItem('userToken', data.token);
          dispatch(registerUserAction(data.token));
          setSuccessMessage('Signup Successful!');
          actions.resetForm();
          navigate('/dashboard');
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

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {['username', 'email', 'dob', 'password', 'phone'].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'password' ? 'password' : field === 'dob' ? 'date' : 'text'}
                name={field}
                autoComplete={field}
                placeholder={`Enter your ${field}`}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.errors[field] && formik.touched[field] && (
                <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition disabled:bg-gray-400"
            disabled={isPending || formik.isSubmitting}
          >
            {isPending ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 font-semibold hover:underline">
            Login here
          </Link>
        </p>

        {isError && (
          <div className="alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto">
            {error?.response?.data?.message || error.message || 'Something went wrong!'}
          </div>
        )}
        {isSuccess && (
          <div className="alert-box bg-green-100 text-green-800 border border-green-300 text-center max-w-lg p-5 rounded-lg mx-auto">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
