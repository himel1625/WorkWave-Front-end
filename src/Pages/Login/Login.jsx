import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logInAmico from '../../assets/Login-amico.png';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <div className='min-h-screen bg-lightPrimary dark:bg-darkPrimary flex items-center justify-center'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl p-8'>
        {/* Image Section */}
        <div className='flex justify-center items-center hidden md:block'>
          <img
            src={logInAmico}
            alt='Login illustration'
            className='w-full h-auto'
          />
        </div>
        {/* Form Section */}
        <div className='w-full max-w-md p-8 rounded-lg shadow-md bg-white dark:bg-gray-800'>
          <h2 className='text-2xl font-bold text-center text-gray-800 dark:text-white mb-6'>
            Welcome to WorkWave
          </h2>
          <p className='text-center text-gray-400 mb-4'>
            Need an account?
            <a href='#' className='text-blue-500 hover:underline'>
              Sign Up
            </a>
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
          <form>
            {/* Username Field */}
            <div className='mb-6 relative'>
              <input
                type='text'
                id='username'
                className='w-full px-4 py-3 bg-transparent text-white border-2 border-gray-500 rounded-lg transition duration-300'
                placeholder=' '
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
              <label
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-300 transition-all duration-300 ${
                  username ? 'top-0 text-xs' : ''
                }`}
                htmlFor='username'
              >
                Username*
              </label>
            </div>

            {/* Password Field */}
            <div className='mb-6 relative'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id='password'
                className='w-full px-4 py-3 bg-transparent text-white border-2 border-gray-500 focus:outline-none focus:ring-2  rounded-lg transition duration-300'
                placeholder=' '
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <label
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-300 transition-all duration-300 ${
                  password ? 'top-0 text-xs' : ''
                }`}
                htmlFor='password'
              >
                Password*
              </label>
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
            <div className='flex justify-center mt-4 space-x-4'></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
