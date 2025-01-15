import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

const WorkSheetTable = () => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full table-auto'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-4 py-2 border-b text-left'>Tasks</th>
            <th className='px-4 py-2 border-b text-left'>Hours Worked</th>
            <th className='px-4 py-2 border-b text-left'>Date</th>
            <th className='px-4 py-2 border-b text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Static Data for Design */}
          <tr>
            <td className='px-4 py-2 border-b'>Sales</td>
            <td className='px-4 py-2 border-b'>8</td>
            <td className='px-4 py-2 border-b'>2025-01-14</td>
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
          <tr>
            <td className='px-4 py-2 border-b'>Support</td>
            <td className='px-4 py-2 border-b'>6</td>
            <td className='px-4 py-2 border-b'>2025-01-13</td>
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
          {/* Add more static rows if needed */}
        </tbody>
      </table>
    </div>
  );
};

export default WorkSheetTable;
