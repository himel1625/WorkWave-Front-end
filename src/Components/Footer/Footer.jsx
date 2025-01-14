import { Box, Typography } from '@mui/material';
const Footer = () => {
  return (
    <div>
      <Box
        className='text-center text-gray-500 text-sm bg-black w-full'
        sx={{ padding: '10px 0', textAlign: 'center' }}
      >
        <Typography>
          &copy; {new Date().getFullYear()} WorkWave. All rights reserved.(Himel)
        </Typography>
      </Box>
    </div>
  );
};

export default Footer;
