import { Box, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
// import { FaBars, FaCog, FaHome, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import {
  MdLogout,
  MdManageAccounts,
  MdOutlineForwardToInbox,
} from 'react-icons/md';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/WorkWave.png';
import Theme from '../../Context/Theme';
import useAuth from '../../hooks/useAuth';
const Navbar = () => {
  const { logOut, user, isOpenButton } = useAuth();
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleCardVisibility = () => {
    setIsCardVisible(prev => !prev);
  };

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsCardVisible(false);
    }
  };

  useEffect(() => {
    if (isCardVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCardVisible]);

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    isOpenButton(isOpen);
  };

  // Function to toggle blank pop-up visibility
  const togglePopupVisibility = () => {
    setIsPopupVisible(prev => !prev);
  };

  return (
    <div className='fixed w-full top-0 z-50'>
      <div className='bg-lightSecondary dark:bg-darkSecondary'>
        <Toolbar className='flex justify-between items-center'>
          <Typography
            variant='h6'
            className='text-black no-underline text-lg font-bold flex items-center gap-4'
          >
            <Box className='cursor-pointer dark:text-lightSecondary text-darkSecondary dark:bg-darkSecondary flex items-center justify-center '>
              <div className='flex items-center justify-center'>
                <NavLink to='/'>
                  <div
                    className={`md:flex items-center justify-center pb-5 hidden md:block  ${
                      isOpen
                        ? 'items-center justify-center mt-5'
                        : 'items-center justify-center mt-5'
                    }`}
                  >
                    <img
                      className={`transition-all duration-300 ${
                        isOpen ? 'w-7 h-7' : 'w-7 h-7'
                      }`}
                      src={logo}
                      alt='WorkWave Logo'
                    />
                    {!isOpen && (
                      <h1 className='text-xl font-bold ml-2 dark:text-lightSecondary text-darkSecondary'>
                        WorkWave
                      </h1>
                    )}
                  </div>
                </NavLink>
                <div className='pl-10'>
                  <FaBars size={25} onClick={toggleSidebar} />
                </div>
              </div>
            </Box>
          </Typography>
          <div className='flex items-center gap-6 justify-center'>
            <div className='hidden md:block md:flex items-center justify-center gap-8 dark:text-lightSecondary text-darkSecondary'>
              <NavLink to='/contactUs'>
                <p className='font-bold'>ContactUs</p>
              </NavLink>

              <NavLink to='/login'>
                <p className='font-bold'>login</p>
              </NavLink>
            </div>
            <div className='hidden md:block'>
              <Theme />
            </div>
            <Box className='flex items-center justify-center gap-4'>
              <div
                onClick={toggleCardVisibility}
                className='cursor-pointer hidden md:block hover:bg-[#b4bbc2] rounded-xl px-2 py-1 transition-all duration-200'
              >
                <div className='flex items-center justify-center gap-2'>
                  <p className='font-bold text-black dark:text-lightSecondary'>
                    <p>{user?.displayName || 'User Name'}</p>
                  </p>
                  <img
                    className='rounded-full w-8 h-8 object-cover'
                    referrerPolicy='no-referrer'
                    src={
                      (user && user?.photoURL) ||
                      'https://i.ibb.co.com/MVHh5Bd/man.jpg'
                    }
                    alt='user name'
                  />
                </div>
              </div>
              <div className='flex items-center justify-center mx-20 md:hidden dark:text-lightSecondary text-darkSecondary'>
                <img src={logo} alt='WorkWave Logo' />
                <p className='font-bold'> orkWave</p>
              </div>
              {/* RiArrowUpDownFill Button to toggle blank pop-up visibility */}
              <div
                onClick={togglePopupVisibility}
                className='md:hidden cursor-pointer dark:text-lightSecondary text-darkSecondary'
              >
                <RiArrowUpDownFill size={25} />
              </div>
            </Box>
          </div>
        </Toolbar>

        {isCardVisible && (
          <div
            ref={dropdownRef}
            className='absolute top-36 md:top-16 right-10 bg-[#efedf0] dark:bg-gray-800 shadow-lg p-4 cursor-pointer w-44 h-44 rounded-lg'
          >
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <MdManageAccounts
                  size={20}
                  className='text-darkSecondary dark:text-lightSecondary'
                />
                <p className='text-darkSecondary dark:text-lightSecondary font-bold'>
                  Account
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <MdOutlineForwardToInbox
                  size={20}
                  className='text-darkSecondary dark:text-lightSecondary'
                />
                <p className='text-darkSecondary dark:text-lightSecondary font-bold'>
                  Inbox
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <IoSettingsOutline
                  size={20}
                  className='text-darkSecondary dark:text-lightSecondary'
                />
                <p className='text-darkSecondary dark:text-lightSecondary font-bold'>
                  Settings
                </p>
              </div>
              <div onClick={() => logOut()} className='flex items-center gap-2'>
                <MdLogout
                  size={20}
                  className='text-darkSecondary dark:text-lightSecondary'
                />
                <p className='text-darkSecondary dark:text-lightSecondary font-bold'>
                  Logout
                </p>
              </div>
            </div>
          </div>
        )}

        {isPopupVisible && (
          <div className='absolute top-16   shadow-lg p-4 cursor-pointer w-96 h-20  flex  items-center justify-center gap-4 bg-lightSecondary dark:bg-darkSecondary'>
            <div className=' flex items-center justify-center gap-6 dark:text-lightSecondary text-darkSecondary'>
              <NavLink to='/contactUs'>
                <p className='font-bold'>ContactUs</p>
              </NavLink>

              <NavLink to='/login'>
                <p className='font-bold'>login</p>
              </NavLink>
            </div>
            <div className='text-green-400'>
              <Theme />
            </div>
            <div
              onClick={toggleCardVisibility}
              className='cursor-pointer   transition-all duration-200'
            >
              <div className='flex items-center justify-center gap-2 '>
                <p className='font-bold dark:text-lightSecondary text-darkSecondary'>
                  <p>{user?.displayName || 'User Name'}</p>
                </p>
                <img
                  className='rounded-full w-8 h-8 object-cover'
                  referrerPolicy='no-referrer'
                  src={
                    (user && user?.photoURL) ||
                    'https://i.ibb.co.com/MVHh5Bd/man.jpg'
                  }
                  alt='user name'
                />
              </div>
            </div>
          </div>
        )}
        {/* <div className='md:hidden'>
          {isOpen === false ? (
            <div className=''>
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
          ) : (
            <div></div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
