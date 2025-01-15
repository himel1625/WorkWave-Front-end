import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { imageUpload } from '../../Api/utils';
import google from '../../assets/Google.png';
import upAmico from '../../assets/Sign up-amico.png';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, createUser, updateUserProfile, logOut } = useAuth();

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () =>
    setPasswordVisible(prevState => !prevState);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Signin Successful');
      logOut();
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Google Sign-In Failed');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/bank-data`, data);
    } catch (error) {
      console.error('Error posting data:', error);
    }

    try {
      const { email, password, username } = data;
      if (password.length < 6) {
        toast.error('❌ Password must contain at least 6 characters');
      }
      if (!/[A-Z]/.test(password)) {
        toast.error('❌ Password must contain at least one uppercase letter');
      }
      if (!/[a-z]/.test(password)) {
        toast.error('❌ Password must contain at least one lowercase letter');
      }
      const file = data.photo?.[0];
      if (!file) {
        toast.error('Photo is required');
        return;
      }
      const photoURL = await imageUpload(file);
      toast.success('Photo uploaded successfully!');
      navigate('/login');
      await createUser(email, password);
      toast.success('Account created successfully!');
      await updateUserProfile(username, photoURL);
      logOut();
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='min-h-screen bg-lightPrimary dark:bg-darkPrimary flex items-center justify-center md:mt-6'>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className='mb-4'>
            <label
              className='block text-gray-600 text-sm font-medium mb-1'
              htmlFor='username'
            >
              Username*
            </label>
            <input
              {...register('username', { required: 'Username is required' })}
              type='text'
              id='username'
              className='w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your username'
            />
            {errors.username && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Photo Field */}
          <div className='mb-4'>
            <label
              className='block text-gray-600 text-sm font-medium mb-1'
              htmlFor='photo'
            >
              Photo
            </label>
            <input
              type='file'
              {...register('photo', {
                required: 'Photo is required',
              })}
              id='photo'
              accept='image/*'
              className='w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.photo && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.photo.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className='mb-4'>
            <label
              className='block text-gray-600 text-sm font-medium mb-1'
              htmlFor='email'
            >
              Email*
            </label>
            <input
              {...register('email', { required: 'Email is required' })}
              type='email'
              id='email'
              className='w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your email'
            />
            {errors.email && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className='mb-4 relative'>
            <label
              className='block text-gray-600 text-sm font-medium mb-1'
              htmlFor='password'
            >
              Password*
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              type={passwordVisible ? 'text' : 'password'}
              id='password'
              className='w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your password'
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-4'
            >
              {passwordVisible ? (
                <AiOutlineEyeInvisible size={20} className='text-gray-500' />
              ) : (
                <AiOutlineEye size={20} className='text-gray-500' />
              )}
            </button>
            {errors.password && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>

          <div className='mb-4'>
            <label
              className='block text-gray-600 text-sm font-medium mb-1'
              htmlFor='bank_account_no'
            >
              Bank Account No
            </label>
            <input
              {...register('text', {
                required: '   Bank Account No is required',
              })}
              type='text'
              id='bank_account_no'
              placeholder='bank_account_no'
              className='w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none'
            />
            {errors.bank_account_no && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.bank_account_no.message}
              </p>
            )}
          </div>
          <div className='flex items-center justify-center gap-4'>
            <div className='mb-4'>
              <label
                className='block text-gray-600 text-sm font-medium mb-1'
                htmlFor='salary'
              >
                Salary
              </label>
              <input
                {...register('number', {
                  required: ' salary is required',
                })}
                type='number'
                id='salary'
                placeholder='salary'
                className='w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none'
              />
              {errors.salary && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.salary.message}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-600 text-sm font-medium mb-1'
                htmlFor='designation'
              >
                Designation
              </label>
              <select
                {...register('designation')}
                id='designation'
                className='w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 focus:outline-none'
              >
                <option value='Sales Assistant'>Sales Assistant</option>
                <option value='Social Media Executive'>
                  Social Media Executive
                </option>
                <option value='Digital Marketer'>Digital Marketer</option>
              </select>
            </div>
          </div>

          {/* Login Redirect */}
          <p className='text-sm text-gray-500 mb-6 flex'>
            Already Registered?{' '}
            <NavLink to='/login'>
              <span className='text-blue-500 hover:underline'>Login</span>
            </NavLink>
          </p>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300'
          >
            Register
          </button>

          {/* Google Sign-In */}
          <div className='text-center text-gray-500 my-4'>OR</div>
          <div
            onClick={handleGoogleSignIn}
            className='flex justify-center items-center mt-4 gap-4 cursor-pointer'
          >
            <img className='w-8 h-8' src={google} alt='google' />
            <p className='font-bold'>Login with Google</p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
