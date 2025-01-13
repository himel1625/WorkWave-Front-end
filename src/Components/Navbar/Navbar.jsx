// src/components/Navbar.js
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { FaRegBell } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../assets/WorkWave.png';
import Theme from '../../Context/Theme';

const Navbar = () => {
  return (
    <div className='fixed w-full top-0 z-50 '>
      <div className='lg:px-12 bg-lightSecondary dark:bg-darkSecondary'>
        <Toolbar className='flex justify-between items-center px-4'>
          <div className='lg:hidden'>
            <IconButton>
              <GiHamburgerMenu
                size={30}
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
              <h1 className='font-bold  dark:text-lightSecondary text-darkSecondary'>
                WorkWave
              </h1>
            </Box>
          </Typography>
          <div className='flex items-center gap-6 justify-center'>
            <Theme />
            <Box>
              <FaRegBell />
            </Box>
          </div>
        </Toolbar>
      </div>
    </div>
  );
};

export default Navbar;
