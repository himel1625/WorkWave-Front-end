import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { AiFillCarryOut, AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../../Components/LoadingSpinner/LoadingSpinner';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const AllEmployeeList = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newSalary, setNewSalary] = useState('');

  const {
    data: AllEmployees,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['employee'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('all-employee-list');
      return data;
    },
  });

  const handleSalaryAdjust = async () => {
    if (parseInt(newSalary) < parseInt(selectedEmployee.number)) {
      Swal.fire({
        title: 'Invalid Salary',
        text: 'New salary cannot be less than the current salary.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    try {
      await axiosPublic.patch('/up-date-Salary', {
        id: selectedEmployee?._id,
        salary: newSalary,
      });
      setSelectedEmployee(null);
      setNewSalary('');
      refetch();
    } catch (error) {
      console.error('Error updating salary:', error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const handleDelete = async email => {
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
          await axiosSecure.delete(`/delete-users/${email}`);
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
          refetch();
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue deleting the user.',
            icon: 'error',
          });
        }
      }
    });
  };

  const handleRoleUpdate = async email => {
    try {
      await axiosSecure.put(`/update-role/${email}`);
      Swal.fire({
        title: 'Are you sure?',
        text: "This will change the user's role to HR. You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change role!',
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Role Changed!',
            text: 'The user role has been successfully updated to HR.',
            icon: 'success',
          });
          refetch();
        }
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue updating the user role.',
        icon: 'error',
      });
    }
  };

  return (
    <div className='p-6 dark:text-lightSecondary text-darkSecondary'>
      <h2 className='text-xl font-bold mb-4'>All Employee List</h2>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full bg-lightSecondary dark:bg-darkSecondary dark:text-lightSecondary text-darkSecondary border-collapse border border-gray-300'>
          <thead>
            <tr>
              <th className='border border-gray-300 px-4 py-2'>Name</th>
              <th className='border border-gray-300 px-4 py-2'>Email</th>
              <th className='border border-gray-300 px-4 py-2'>Designation</th>
              <th className='border border-gray-300 px-4 py-2'>
                Bank Account No
              </th>
              <th className='border border-gray-300 px-4 py-2'>Salary</th>
              <th className='border border-gray-300 px-4 py-2'>
                Adjust Salary
              </th>
              <th className='border border-gray-300 px-4 py-2'>Fire</th>
              <th className='border border-gray-300 px-4 py-2'>Make HR</th>
              <th className='border border-gray-300 px-4 py-2'>Details</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {AllEmployees &&
              AllEmployees.bankData
                .filter(item => item.email !== 'admin@gmail.com')
                .map(item => (
                  <tr key={item._id}>
                    <td className='border border-gray-300 px-4 py-2'>
                      {item.username}
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      {item.email}
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      {item.designation}
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      {item.text}
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      {item.number}
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      <button
                        onClick={() => setSelectedEmployee(item)}
                        className='bg-blue-500 text-white px-2 py-1 rounded'
                      >
                        Adjust
                      </button>
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      <button
                        onClick={() => handleDelete(item.email)}
                        className='text-red-500'
                      >
                        <AiOutlineDelete size={25} />
                      </button>
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      <button
                        onClick={() => handleRoleUpdate(item.email)}
                        className='text-green-500'
                      >
                        <AiFillCarryOut size={25} />
                      </button>
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      Details
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedEmployee && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-lightSecondary dark:bg-darkSecondary p-6 rounded shadow-lg w-96'>
            <h3 className='text-lg font-bold mb-4'>Adjust Salary</h3>
            <p className='mb-2'>
              Adjust salary for <strong>{selectedEmployee.username}</strong>
            </p>
            <input
              type='number'
              placeholder='Enter new salary'
              value={newSalary}
              defaultValue={parseInt(selectedEmployee.number)}
              onChange={e => setNewSalary(e.target.value)}
              className='w-full p-2 border rounded mb-4 bg-lightSecondary dark:bg-darkSecondary'
            />
            <div className='flex justify-end gap-4'>
              <button
                onClick={() => setSelectedEmployee(null)}
                className='px-4 py-2 bg-gray-300 text-black rounded'
              >
                Cancel
              </button>
              <button
                onClick={handleSalaryAdjust}
                className='px-4 py-2 bg-blue-500 text-white rounded'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AllEmployeeList;
