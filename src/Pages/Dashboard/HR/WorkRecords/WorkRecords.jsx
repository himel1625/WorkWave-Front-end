import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import LoadingSpinner from '../../../../Components/LoadingSpinner/LoadingSpinner';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';

const WorkRecords = () => {
  const axiosPublic = useAxiosPublic();
  const [filters, setFilters] = useState({
    userName: '',
    month: '',
    year: '',
  });
  const { data: workRecords, isLoading } = useQuery({
    queryKey: ['employee', filters],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/progress', {
        params: filters,
      });
      return data;
    },
  });
  const userNames = [
    ...new Set(workRecords?.map(record => record.userName).filter(Boolean)),
  ];
  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold mb-4'>Work Records</h2>

      <div className='mb-4  flex items-center justify-center'>
        <div className='flex gap-4'>
          <select
            name='userName'
            value={filters.userName}
            onChange={handleFilterChange}
            className='border border-gray-300 rounded p-2'
          >
            <option value=''>Select Name</option>
            {userNames?.map((userName, index) => (
              <option key={index} value={userName}>
                {userName}
              </option>
            ))}
          </select>

          <select
            name='month'
            value={filters.month}
            onChange={handleFilterChange}
            className='border border-gray-300 rounded p-2'
          >
            <option value=''>Select Month</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>
                {new Date(0, month - 1).toLocaleString('en', { month: 'long' })}
              </option>
            ))}
          </select>

          <select
            name='year'
            value={filters.year}
            onChange={handleFilterChange}
            className='border border-gray-300 rounded p-2'
          >
            <option value=''>Select Year</option>
            {Array.from(
              { length: 50 },
              (_, i) => new Date().getFullYear() - i,
            ).map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='overflow-x-auto dark:text-lightSecondary text-darkSecondary'>
        <table className='min-w-full border-collapse border bg-lightSecondary dark:bg-darkSecondary dark:text-lightSecondary text-darkSecondary  border-gray-300'>
          <thead>
            <tr>
              <th className='border border-gray-300 px-4 py-2'>Name</th>
              <th className='border border-gray-300 px-4 py-2'>Email</th>
              <th className='border border-gray-300 px-4 py-2'>Task</th>
              <th className='border border-gray-300 px-4 py-2'>Hours Worked</th>
              <th className='border border-gray-300 px-4 py-2'>Date</th>
            </tr>
          </thead>
          <tbody>
            {workRecords?.map(record => (
              <tr key={record.id} className='text-center'>
                <td className='border border-gray-300 px-4 py-2'>
                  {record.userName || 'N/A'}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {record.email}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {record.task}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {record.hoursWorked}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {new Date(record.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkRecords;
