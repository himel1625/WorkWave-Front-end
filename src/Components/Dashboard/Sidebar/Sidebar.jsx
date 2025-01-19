import React from 'react';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/WorkWave.png';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../Hooks/useRole';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import AdminMenu from '../Menu/AdminMenu/AdminMenu';
import EmployeeMenu from '../Menu/Employeemenu/Employeemenu';
import HRMenu from '../Menu/HRMenu/HRMenu';

const Sidebar = () => {
  const [role, isLoading] = useRole();

  const { value, user } = useAuth();
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={`mt-20 md:mt-0 ${value ? 'block ' : ' md:block'}`}>
      <div
        className={`flex flex-col h-screen bg-lightSecondary dark:bg-darkSecondary transition-all duration-700 ${
          value ? 'md:w-60 w-4' : 'md:w-16 w-2'
        }`}
      >
        {/* Logo Section */}
        <div className='hidden md:block'>
          <NavLink to='/'>
            <div
              className={`flex ${
                value
                  ? 'items-center justify-center mt-5'
                  : 'items-center justify-center mt-5'
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
                <h1 className='text-xl font-bold ml-2 dark:text-lightSecondary text-darkSecondary'>
                  WorkWave
                </h1>
              )}
            </div>
          </NavLink>
        </div>

        {/* User Profile Section */}
        <div className='hidden md:block  mx-auto'>
          <div
            className={` mx-auto mt-10 dark:text-lightSecondary text-darkSecondary ${
              value === false ? 'hidden' : 'block'
            }`}
          >
            <img
              className='w-20 h-20 rounded-lg object-cover'
              referrerPolicy='no-referrer'
              src={user?.photoURL || 'https://i.ibb.co/MVHh5Bd/man.jpg'}
              alt='User Avatar'
            />
            <p className='font-bold pt-2'>{user?.displayName || 'User Name'}</p>
            <p>{role}</p>
          </div>
        </div>
        {/* Navigation Links */}
        <nav
          className={`flex flex-col mt-4 space-y-4 dark:text-lightSecondary text-darkSecondary ${
            value ? 'px-6' : 'px-5'
          } transition-all`}
        >
          {role && role === 'Admin' && <AdminMenu />}
          {role && role === 'HR' && <HRMenu />}
          {role && role === 'Employee' && <EmployeeMenu />}

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
