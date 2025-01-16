import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { saveUser } from '../../Api/utils';
import google from '../../assets/Google.png';
import logInAmico from '../../assets/Login-amico.png';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromHome = location?.state || '/';
  const { signInWithGoogle, signIn } = useAuth();

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

  const onSubmit = async data => {
    const { email, password } = data;
    await saveUser(data);

    if (!email || !email.includes('@')) {
      toast.error('❌ Please provide a valid email');
      return;
    }
    if (password.length < 6) {
      toast.error('❌ Password must contain at least 6 characters');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error('❌ Password must contain at least one uppercase letter');
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error('❌ Password must contain at least one lowercase letter');
      return;
    }

    try {
      await signIn(email, password);
      toast.success('Signin Successful');
      navigate(fromHome, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error('❌ Error during login. Please try again');
    }
  };

  return (
    <div className='min-h-screen bg-lightPrimary dark:bg-darkPrimary flex items-center justify-center'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl p-8'>
        <div className='flex justify-center items-center hidden md:block'>
          <img
            src={logInAmico}
            alt='Login illustration'
            className='w-full h-auto object-cover'
          />
        </div>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-300 mb-2'
              >
                Email*
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address',
                  },
                })}
                type='email'
                id='email'
                className='w-full px-4 py-3 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
                placeholder='Enter your email'
              />
              {errors.email && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.email.message}
                </p>
              )}
            </div>

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
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                    pattern: {
                      value: /[A-Z]/,
                      message:
                        'Password must contain at least one uppercase letter',
                    },
                    validate: value =>
                      /[a-z]/.test(value) ||
                      'Password must contain at least one lowercase letter',
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

            <div className='mb-6'>
              <label
                htmlFor='role'
                className='block text-sm font-medium text-gray-300 mb-2'
              >
                Select Role*
              </label>
              <select
                {...register('role', { required: 'Role is required' })}
                id='role'
                className='w-full px-4 py-3 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
              >
                {/* <option value='Admin'>Admin</option> */}
                <option value='HR'>HR</option>
                <option value='Employee'>Employee</option>
              </select>
              {errors.role && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.role.message}
                </p>
              )}
            </div>

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
