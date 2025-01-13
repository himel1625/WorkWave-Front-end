import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FaRegBell } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiArrowUpDownFill } from 'react-icons/ri';
import logo from '../../assets/WorkWave.png';
import Theme from '../../Context/Theme';
const Navbar = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  return (
    <div className='fixed w-full top-0 z-50'>
      <div className='lg:px-12 bg-lightSecondary dark:bg-darkSecondary'>
        <Toolbar className='flex justify-between items-center px-4'>
          <div className='lg:hidden'>
            <IconButton>
              <GiHamburgerMenu
                size={25}
                className='dark:text-lightSecondary text-darkSecondary'
              />
            </IconButton>
          </div>
          <Typography
            variant='h6'
            to='/'
            className='text-black no-underline text-lg font-bold flex items-center gap-4'
          >
            <Box className='flex items-center justify-center gap-4'>
              <img className='w-6 h-6' src={logo} alt='WorkWave Logo' />
              <h1 className='font-bold dark:text-lightSecondary text-darkSecondary'>
                WorkWave
              </h1>
            </Box>
          </Typography>
          <div className='flex items-center gap-6 justify-center'>
            <div className='hidden md:block'>
              <Theme />
            </div>
            <Box className='flex items-center justify-center gap-4'>
              <div className='hidden md:block dark:text-lightSecondary text-darkSecondary'>
                <FaRegBell size={25} />
              </div>

              <div
                className='w-6 h-6 bg-red-600 cursor-pointer hidden md:block'
                onClick={toggleCardVisibility}
              ></div>

              <div
                onClick={toggleCardVisibility}
                className='md:hidden  cursor-pointer  dark:text-lightSecondary text-darkSecondary'
              >
                <RiArrowUpDownFill size={25} />
              </div>
            </Box>
          </div>
        </Toolbar>
        {isCardVisible && (
          <div className='absolute top-16 right-4 bg-white dark:bg-gray-800 shadow-lg p-4 rounded-lg'>
            {/* Your card content */}
            <h3>Notification Card</h3>
            <p>This is where the card content goes.</p>
            <button onClick={toggleCardVisibility}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
