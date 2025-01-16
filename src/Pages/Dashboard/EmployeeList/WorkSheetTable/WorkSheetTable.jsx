import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../../Components/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const WorkSheetTable = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();

  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['E-T-Data', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/employee-task-Data/${user?.email}`,
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const handleDelete = async id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/delete/${id}`);
          queryClient.invalidateQueries(['E-T-Data']);
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
        } catch (error) {
          console.error('Error deleting data:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue deleting the file.',
            icon: 'error',
          });
        }
      }
    });
  };

  const handleUpdate = row => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleSave = async updatedData => {
    try {
      await axiosSecure.put(`/update/${updatedData._id}`, updatedData);
      queryClient.invalidateQueries(['E-T-Data']);
      setIsModalOpen(false);
      Swal.fire({
        title: 'Success!',
        text: 'Data updated successfully.',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error updating data:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue updating the data.',
        icon: 'error',
      });
    }
  };

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
                {new Date(row.date).toLocaleDateString()}
              </td>
              <td className='px-4 py-2 border-b'>
                <div className='flex gap-6'>
                  <button
                    onClick={() => handleUpdate(row)}
                    className='text-blue-500'
                  >
                    <FaPen size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(row._id)}
                    className='text-red-500'
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedRow && (
        <div className='fixed inset-0 flex items-center justify-center  bg-opacity-50'>
          <div className=' dark:text-lightSecondary text-darkSecondary  bg-lightSecondary dark:bg-darkSecondary rounded-lg p-6 w-1/3'>
            <h2 className='text-xl font-bold mb-4'>Update Task</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSave(selectedRow);
              }}
            >
              <div className='mb-4'>
                <label className='block'>Task</label>
                <select
                  value={selectedRow.task}
                  onChange={e =>
                    setSelectedRow({ ...selectedRow, task: e.target.value })
                  }
                  className='w-full px-3 py-2 border rounded bg-lightSecondary dark:bg-darkSecondary'
                >
                  <option value='' disabled>
                    Select Task
                  </option>
                  <option value='Sales'>Sales</option>
                  <option value='Support'>Support</option>
                  <option value='Content'>Content</option>
                  <option value='Paper-work'>Paper-work</option>
                </select>
              </div>
              <div className='mb-4'>
                <label className='block '>Hours Worked</label>
                <input
                  type='number'
                  value={selectedRow.hoursWorked}
                  onChange={e =>
                    setSelectedRow({
                      ...selectedRow,
                      hoursWorked: e.target.value,
                    })
                  }
                  className='w-full px-3 py-2 border rounded bg-lightSecondary dark:bg-darkSecondary'
                />
              </div>
              <div className='mb-4'>
                <label className='block'>Date</label>
                <input
                  type='date'
                  value={new Date(selectedRow.date).toISOString().split('T')[0]}
                  onChange={e =>
                    setSelectedRow({ ...selectedRow, date: e.target.value })
                  }
                  className='w-full px-3 py-2 border rounded bg-lightSecondary dark:bg-darkSecondary'
                />
              </div>
              <div className='flex justify-end gap-4'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSheetTable;
