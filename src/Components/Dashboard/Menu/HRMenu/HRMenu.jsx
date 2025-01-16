import React from 'react';
import useAuth from '../../../../hooks/useAuth';

import { FaTable, FaTasks } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const HRMenu = () => {
  const { value } = useAuth();
  return (
    <div>
      <Link
        to='/employeeList'
        className='flex items-center py-2 hover:bg-gray-700 transition-colors rounded-lg'
      >
        <FaTable className='text-lg' />
        {value && <span className='ml-4'>Employee-list</span>}
      </Link>
      {/* <Link
        to='/'
        className='flex items-center py-2 hover:bg-gray-700 transition-colors rounded-lg'
      >
        <FaUserCircle className='text-lg' />
        {value && <span className='ml-4'>EmployeeInfo</span>}
      </Link> */}
      <Link
        to='/workRecords'
        className='flex items-center py-2 hover:bg-gray-700 transition-colors rounded-lg'
      >
        <FaTasks className='text-lg' />
        {value && <span className='ml-4'>Work Records</span>}
      </Link>
    </div>
  );
};

export default HRMenu;
