import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import LoadingSpinner from '../../../../Components/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const WorkSheetTable = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['E-T-Data', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/employee-t-Data/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='overflow-x-auto dark:text-lightSecondary text-darkSecondary'>
      <table className='min-w-full table-auto'>
        <thead className=''>
          <tr>
            <th className='px-4 py-2 border-b text-left'>Tasks</th>
            <th className='px-4 py-2 border-b text-left'>Hours Worked</th>
            <th className='px-4 py-2 border-b text-left'>Date</th>
            <th className='px-4 py-2 border-b text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr key={index}>
              <td className='px-4 py-2 border-b'>{row.task}</td>
              <td className='px-4 py-2 border-b'>{row.hoursWorked}</td>
              <td className='px-4 py-2 border-b'>
                {/* Formatting date (adjust the format as needed) */}
                {new Date(row.date).toLocaleDateString()}
              </td>
              <td className='px-4 py-2 border-b'>
                <div className='flex gap-2'>
                  <button className='text-blue-500'>
                    <FaPen />
                  </button>
                  <button className='text-red-500'>
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkSheetTable;
