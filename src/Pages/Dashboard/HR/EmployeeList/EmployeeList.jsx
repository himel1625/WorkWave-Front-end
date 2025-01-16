import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaInfoCircle } from 'react-icons/fa'; // Import the icon
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../../../../Components/LoadingSpinner/LoadingSpinner';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';

const EmployeeList = () => {
  const axiosPublic = useAxiosPublic();

  const { data: employees, isLoading } = useQuery({
    queryKey: ['employee'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('employee-list');
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4'>Employee List</h2>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border border-gray-300 px-4 py-2'>Name</th>
              <th className='border border-gray-300 px-4 py-2'>Email</th>
              <th className='border border-gray-300 px-4 py-2'>Verify</th>
              <th className='border border-gray-300 px-4 py-2'>Bank Account</th>
              <th className='border border-gray-300 px-4 py-2'>Salary</th>
              <th className='border border-gray-300 px-4 py-2'>Pay</th>
              <th className='border border-gray-300 px-4 py-2'>Details</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map(employee => (
              <tr key={employee.email} className='hover:bg-gray-100'>
                <td className='border border-gray-300 px-4 py-2'>
                  {employee.username || 'N/A'}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {employee.email}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {employee.verified ? (
                    <span className='text-green-600 font-semibold'>
                      Verified
                    </span>
                  ) : (
                    <span className='text-red-600 font-semibold'>
                      Not Verified
                    </span>
                  )}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {employee.text || 'N/A'}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {employee.pay || 'N/A'}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {employee.number || 'N/A'}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center'>
                  <NavLink to={`/employeeInfo/${employee._id}`}>
                    <button className='text-blue-600 hover:text-blue-800'>
                      <FaInfoCircle className='inline-block text-lg' />
                    </button>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
