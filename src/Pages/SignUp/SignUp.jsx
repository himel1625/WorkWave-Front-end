import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import icons
import upAmico from '../../assets/Sign up-amico.png';

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState); // Toggle the password visibility
  };

  return (
    <div className='min-h-screen bg-lightPrimary dark:bg-darkPrimary flex items-center justify-center md:mt-6 '>
      <div className='flex justify-center items-center hidden md:block'>
        <img
          src={upAmico}
          alt='Signup illustration'
          className='w-full h-[500px] object-cover'
        />
      </div>
      <div className='w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-2'>
          Sign Up
        </h2>
        <p className='text-center text-gray-500 mb-6'>
          Enter details to create your account
        </p>
        <form>
          <div className='mb-4'>
            <label
              className='block text-gray-600 text-sm font-medium mb-1'
              htmlFor='username'
            >
              Username*
            </label>
            <input
              type='text'
              id='username'
              className='w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your username'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-600 text-sm font-medium mb-1'
              htmlFor='photo'
            >
              Photo
            </label>
            <input
              type='file'
              id='file'
              className='w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your file'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-600 text-sm font-medium mb-1'
              htmlFor='email'
            >
              Email*
            </label>
            <input
              type='email'
              id='email'
              className='w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-4 relative'>
            <label
              className='block text-gray-600 text-sm font-medium mb-1'
              htmlFor='password'
            >
              Password*
            </label>
            <input
              type={passwordVisible ? 'text' : 'password'} // Toggle input type based on passwordVisible state
              id='password'
              className='w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your password'
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-4'
            >
              {passwordVisible ? (
                <AiOutlineEyeInvisible size={20} className='text-gray-500' />
              ) : (
                <AiOutlineEye size={20} className='text-gray-500' />
              )}
            </button>
          </div>

          <p className='text-sm text-gray-500 mb-6 flex'>
            Already Registered?
            <NavLink to='/login'>
              <p className='text-blue-500 hover:underline'> Login</p>
            </NavLink>
          </p>
          <button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300'
          >
            Register
          </button>
          <div className='text-center text-gray-500 my-4'>OR</div>
          <div className='flex justify-center space-x-4'></div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
