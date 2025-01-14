import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import google from '../../assets/Google.png';
import upAmico from '../../assets/Sign up-amico.png';
import useAuth from '../../hooks/useAuth';
const SignUp = () => {
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

  const togglePasswordVisibility = () =>
    setPasswordVisible(prevState => !prevState);

  const onSubmit = data => {
    console.log('Form data:', data);
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
              {...register('photo')}
              type='file'
              id='file'
              className='w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
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
  );
};

export default SignUp;
