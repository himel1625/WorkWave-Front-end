import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import { FaMoon, FaSun } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../assets/WorkWave.png';
const Navbar = ({ theme, toggleTheme }) => {
  console.log(theme);
  return (
    <div className='sticky top-0 z-50 lg:px-12 bg-lightSecondary dark:bg-red-800'>
      <Toolbar className='flex justify-between items-center px-4'>
        <div className='lg:hidden'>
          <IconButton>
            <GiHamburgerMenu />
          </IconButton>
        </div>

        {/* Logo */}
        <Typography
          variant='h6'
          to='/'
          className='text-black no-underline text-lg font-bold flex items-center gap-4'
        >
          <Box className='flex items-center justify-center gap-4'>
            <img className='w-6 h-6' src={logo} alt='WorkWave Logo' />
            <span className=' lg:block hidden dark:text-red-500'>WorkWave</span>
          </Box>
        </Typography>

        <div className='flex items-center gap-6'>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className='p-2 rounded-md focus:outline-none'
            aria-label='Toggle Dark Mode'
          >
            {!theme === 'dark' ? (
              <FaSun className='w-6 h-6 text-gray-800 dark:text-white' />
            ) : (
              <FaMoon className='w-6 h-6 text-gray-800 dark:text-white' />
            )}
          </button>

          {/* "Coming Soon" Text */}
          <Box>Coming Soon</Box>
        </div>
      </Toolbar>
    </div>
  );
};

export default Navbar;
