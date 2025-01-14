import React from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import google from '../../assets/Google.png';
import logInAmico from '../../assets/Login-amico.png';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromHome = location?.state || '/';
  const { signInWithGoogle } = useAuth();
  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Signin Successful');
      navigate(fromHome, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const onSubmit = data => {
    console.log('Form data:', data);
  };

  return (
    <div className='min-h-screen bg-lightPrimary dark:bg-darkPrimary flex items-center justify-center'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl p-8'>
        {/* Image Section */}
        <div className='flex justify-center items-center hidden md:block'>
          <img
            src={logInAmico}
            alt='Login illustration'
            className='w-full h-auto object-cover'
          />
        </div>
        {/* Form Section */}
        <div className='w-full max-w-md p-8 rounded-lg shadow-md bg-white dark:bg-gray-800'>
          <h2 className='text-2xl font-bold text-center text-gray-800 dark:text-white mb-6'>
            Welcome to WorkWave
          </h2>
          <p className='text-center text-gray-400 mb-4 flex items-center justify-center'>
            Need an account?
            <NavLink to='/signup'>
              <p className='text-blue-500 hover:underline'>Sign Up</p>
            </NavLink>
          </p>
          <div className='flex justify-around mb-6'>
            <button className='px-4 py-2 bg-green-500 text-white rounded-full'>
              Admin
            </button>
            <button className='px-4 py-2 bg-orange-500 text-white rounded-full'>
              Employee
            </button>
            <button className='px-4 py-2 bg-blue-500 text-white rounded-full'>
              HR
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username Field */}
            <div className='mb-6'>
              <label
                htmlFor='username'
                className='block text-sm font-medium text-gray-300 mb-2'
              >
                Username*
              </label>
              <input
                {...register('username', { required: 'Username is required' })}
                type='text'
                id='username'
                className='w-full px-4 py-3 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
                placeholder='Enter username'
              />
              {errors.username && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-300 mb-2'
              >
                Password*
              </label>
              <div className='relative'>
                <input
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  type={passwordVisible ? 'text' : 'password'}
                  id='password'
                  className='w-full px-4 py-3  border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition duration-300'
                  placeholder='Enter password'
                />
                <div
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <FaEyeSlash size={20} className='text-gray-500' />
                  ) : (
                    <FaEye size={20} className='text-gray-500' />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className='flex items-center justify-between mb-6'>
              <label className='flex items-center text-gray-400'>
                <input
                  type='checkbox'
                  className='form-checkbox h-4 w-4 text-blue-500'
                />
                <span className='ml-2'>Remember me</span>
              </label>
              <a href='#' className='text-sm text-blue-500 hover:underline'>
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300'
            >
              Login
            </button>
            <div className='text-center text-gray-400 mt-4'>OR</div>
            <div
              onClick={() => handleGoogleSignIn()}
              className='flex justify-center items-center mt-4 gap-4 cursor-pointer'
            >
              <img className='w-8 h-8' src={google} alt='google' />
              <p className='font-bold'>Login with Google</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
