import React from 'react';
import { FaCog, FaHome, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/WorkWave.png';
import useAuth from '../../../hooks/useAuth';

const Sidebar = () => {
  const { value, user } = useAuth();

  return (
    <div className='hidden md:block'>
      <div
        className={`flex flex-col h-screen bg-lightSecondary dark:bg-darkSecondary transition-all duration-700 ${
          value ? 'w-60' : 'w-16'
        }`}
      >
        <NavLink to='/'>
          <div
            className={`flex items-center ${
              value
                ? 'items-center justify-center mt-5'
                : ' items-center justify-center mt-5'
            }`}
          >
            <img
              className={`transition-all duration-300 ${
                value ? 'w-7 h-7' : 'w-7 h-7'
              }`}
              src={logo}
              alt='WorkWave Logo'
            />
            {value && (
              <h1 className='text-xl font-bold ml-2 dark:text-lightSecondary text-darkSecondary  '>
                WorkWave
              </h1>
            )}
          </div>
        </NavLink>

        <div
          className={`mx-auto mt-10 dark:text-lightSecondary text-darkSecondary dark:bg-darkSecondary ${
            value === false ? 'hidden' : 'block'
          }  `}
        >
          <img
            className='w-20 h-20 rounded-lg object-cover'
            referrerPolicy='no-referrer'
            src={
              (user && user?.photoURL) || 'https://i.ibb.co.com/MVHh5Bd/man.jpg'
            }
            alt=''
          />
          <p className='font-bold pt-2'>{user?.displayName || 'User Name'}</p>
        </div>
        {/* Navigation Section */}
        <nav
          className={`flex flex-col mt-4 space-y-4 dark:text-lightSecondary text-darkSecondary dark:bg-darkSecondary ${
            value ? 'px-6' : 'px-5'
          } transition-all`}
        >
          <Link
            to='/employeeList'
            className='flex items-center py-2 hover:bg-gray-700 transition-colors rounded-lg'
          >
            <FaHome className='text-lg' />
            {value && <span className='ml-4'>Home</span>}
          </Link>
          <Link
            to='/'
            className='flex items-center py-2 hover:bg-gray-700 transition-colors rounded-lg'
          >
            <FaUser className='text-lg' />
            {value && <span className='ml-4'>Profile</span>}
          </Link>
          <Link
            to='/'
            className='flex items-center py-2 hover:bg-gray-700 transition-colors rounded-lg'
          >
            <FaCog className='text-lg' />
            {value && <span className='ml-4'>Settings</span>}
          </Link>
          <Link
            to='/'
            className='flex items-center py-2 hover:bg-gray-700 transition-colors rounded-lg'
          >
            <FaSignOutAlt className='text-lg' />
            {value && <span className='ml-4'>Logout</span>}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
