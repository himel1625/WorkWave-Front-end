import React from 'react';
import { Link } from 'react-router-dom';
import ePage from '../../assets/404.png';

const Error = () => {
  return (
    <div className='flex  items-center justify-center h-screen bg-gray-100'>
      <img
        src={ePage}
        alt='404 Error'
        className='mb-8 h-[600px] w-[80%] object-cover'
      />
      <Link to='/'>
        <button className='px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300'>
          Go to Homepage
        </button>
      </Link>
    </div>
  );
};

export default Error;
