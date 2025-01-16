import React from 'react';
import { FaHistory, FaHome, FaTasks } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

const EmployeeMenu = () => {
  const { value } = useAuth();
  return (
    <div>
      <Link
        to='/workSheetForm'
        className='flex items-center py-2 hover:bg-gray-700 transition-colors rounded-lg'
      >
        <FaHome className='text-lg' />
        {value && <span className='ml-4'>workSheetForm</span>}
      </Link>
      <Link
        to='/workSheetTable'
        className='flex items-center py-2 hover:bg-gray-700 transition-colors rounded-lg'
      >
        <FaTasks className='text-lg' />
        {value && <span className='ml-4'>Work Sheet</span>}
      </Link>
      <Link
        to='/paymentHistoryTable'
        className='flex items-center py-2 hover:bg-gray-700 transition-colors rounded-lg'
      >
        <FaHistory className='text-lg' />
        {value && <span className='ml-4'>Payment History</span>}
      </Link>
    </div>
  );
};

export default EmployeeMenu;
