import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { FaCreditCard, FaInfoCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../../../../Components/LoadingSpinner/LoadingSpinner';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
const EmployeeList = () => {
  const axiosPublic = useAxiosPublic();
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const {
    data: employees,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['employee'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('employee-list');
      return data;
    },
  });
  const handlePayClick = employee => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
    setSelectedDate(null);
  };

  const handlePaymentSubmit = e => {
    e.preventDefault();

    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    const month = selectedDate.toLocaleString('default', { month: 'long' });
    const year = selectedDate.getFullYear();

    console.log(
      `Paid ${selectedEmployee.username} for ${month} ${year} - Salary: ${selectedEmployee.number}`,
    );
    handleCloseModal();
  };

  const handleVerifyClick = async employee => {
    try {
      await axiosPublic.patch(`/employee-verify/${employee.email}`, {
        isVerified: true,
      });
      toast.success(`${employee.username || 'Employee'} has been verified.`);
      refetch();
    } catch (error) {
      console.error('Error updating verification:', error);
      toast.error('Failed to verify the employee.');
    }
  };
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='p-6 dark:text-lightSecondary text-darkSecondary'>
      <h2 className='text-xl font-bold mb-4'>Employee List</h2>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full border-collapse border border-gray-300'>
          <thead>
            <tr>
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
              <tr key={employee._id} className='text-center'>
                <td className='border border-gray-300 px-4 py-2'>
                  {employee.username || 'N/A'}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {employee.email}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {employee.isVerified === false ? (
                    <button
                      onClick={() => handleVerifyClick(employee)}
                      className='text-red-600 font-semibold'
                    >
                      ❌
                    </button>
                  ) : (
                    <span className='text-green-600 font-semibold'>✅</span>
                  )}
                </td>

                <td className='border border-gray-300 px-4 py-2'>
                  {employee.text || 'N/A'}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {employee.number || 'N/A'}
                </td>
                <td className='border border-gray-300 px-4 py-2 flex items-center justify-center'>
                  <button
                    onClick={() => handlePayClick(employee)}
                    className='text-green-600 hover:text-green-800'
                  >
                    <FaCreditCard size={20} />
                  </button>
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
      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96'>
            <h3 className='text-lg font-bold mb-4'>Pay Employee</h3>
            <form onSubmit={handlePaymentSubmit}>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Employee Name:
                </label>
                <p className='text-gray-600'>
                  {selectedEmployee?.username || 'N/A'}
                </p>
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Salary:
                </label>
                <p className='text-gray-600'>
                  {selectedEmployee?.number || 'N/A'}
                </p>
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Select Payment Date:
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={setSelectedDate}
                  dateFormat='MMMM yyyy'
                  showMonthYearPicker
                  className='w-full px-3 py-2 border border-gray-300 rounded'
                  placeholderText='Select month and year'
                  required
                />
              </div>
              <div className='mt-4 flex justify-between'>
                <button
                  type='button'
                  onClick={handleCloseModal}
                  className='bg-red-500 text-white px-4 py-2 rounded'
                >
                  Close
                </button>
                <button
                  type='submit'
                  className='bg-green-500 text-white px-4 py-2 rounded'
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
