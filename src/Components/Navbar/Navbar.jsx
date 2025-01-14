import { Box, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import {
  MdLogout,
  MdManageAccounts,
  MdOutlineForwardToInbox,
} from 'react-icons/md';
import { RiArrowUpDownFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

import { FaBars } from 'react-icons/fa';
import Theme from '../../Context/Theme';
import useAuth from '../../hooks/useAuth';
const Navbar = () => {
  const { logOut, user, isOpenButton } = useAuth();
  const [isCardVisible, setIsCardVisible] = useState(false);
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

  return (
    <div className=' sticky top-0 z-50'>
      <div className=' bg-lightSecondary dark:bg-darkSecondary'>
        <Toolbar className='flex justify-between items-center'>
          <Typography
            variant='h6'
            className='text-black no-underline text-lg font-bold flex items-center gap-4'
          >
            <Box className='cursor-pointer dark:text-lightSecondary text-darkSecondary dark:bg-darkSecondary flex items-center '>
              <FaBars size={25} onClick={toggleSidebar} />
              <div>
                <p className='md:hidden block'>WorkWave</p>
              </div>
            </Box>
          </Typography>
          <div className='flex items-center gap-6 justify-center'>
            <div>
              <NavLink to='/contactUs'>
                <p className='font-bold'>ContactUs</p>
              </NavLink>
            </div>
            <div>
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
                className='cursor-pointer hidden md:block hover:bg-[#b4bbc2] rounded-xl px-2 py-1 transition-all duration-200 '
              >
                <div className='flex items-center justify-center gap-2'>
                  <p className='font-bold text-black dark:text-lightSecondary'>
                    <p>{user?.displayName || 'User Name'}</p>
                  </p>
                  <img
                    className='rounded-full w-8 h-8 object-cover'
                    src={
                      (user && user?.photoURL) ||
                      'https://i.ibb.co.com/MVHh5Bd/man.jpg'
                    }
                    alt='user name'
                  />
                </div>
              </div>
              <div className='md:hidden cursor-pointer dark:text-lightSecondary text-darkSecondary '>
                <RiArrowUpDownFill size={25} />
              </div>
            </Box>
          </div>
        </Toolbar>
        {isCardVisible && (
          <div
            ref={dropdownRef}
            className='absolute top-13 right-10 bg-[#efedf0] dark:bg-gray-800 shadow-lg p-4 cursor-pointer w-44 h-44 rounded-lg'
          >
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <MdManageAccounts
                  size={20}
                  className='text-darkSecondary dark:text-lightSecondary'
                />
                <p className='text-darkSecondary dark:text-lightSecondary  font-bold'>
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
      </div>
    </div>
  );
};

export default Navbar;
