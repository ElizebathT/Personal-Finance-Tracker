import  { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode'
import { loginUserAPI } from '../../services/userServices';
import { loginUserAction } from '../../redux/authSlice';
import { useFormik } from 'formik';
import { advSchema } from '../../schema';


const Loginpage = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  
  const { mutateAsync, isError, error, isSuccess } = useMutation({
    mutationFn:loginUserAPI,
    mutationKey:["login-user"]
})
    const navigate = useNavigate()
      
    const dispatch = useDispatch()
    
    const {values, handleBlur, touched, errors,handleChange,handleSubmit} = useFormik({
            initialValues: {
                email: '',
                password: ''
            },          
            
            validationSchema:advSchema,
            onSubmit: async (values, action) => {
                try {              
                  
                    const data = await mutateAsync(values);     
                  if (data?.token) {
                      localStorage.setItem("userToken", data.token);
                      const decodedData = jwtDecode(data.token);
                      dispatch(loginUserAction(decodedData));
                      setSuccessMessage("Login Successful!");
                      action.resetForm();
                      if(data.role==="individual"){
                        navigate("/dashboard");
                      }
                      else{
                        navigate("/admin");
                      }
                  } else {
                      setSuccessMessage("Invalid response from server");
                  }
              } catch (error) {
                  console.error("Login Error:", error);
              }
          }
          
        })
        
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 pt-18">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border-t-4 border-blue-500">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}              
              required
            />
            {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              id='password' 
              name="password"
              required
            />
            {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
          </div>

          <button type="submit"className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
          Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 font-semibold hover:underline">
            Sign up
          </a>
        </p>
        {isError && (
  <div className='alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto'>
    {error?.response?.data?.message || error.message || "Something went wrong!"}
  </div>
)}
  {isSuccess && <div className='alert-box bg-green-100 text-green-800 border border-green-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{successMessage}</div>}
      
      </div>
    </div>
  );
};

export default Loginpage;
