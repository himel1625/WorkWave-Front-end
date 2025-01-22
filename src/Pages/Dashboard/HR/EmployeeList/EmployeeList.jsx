import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { FaCreditCard, FaInfoCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import CheckoutForm from '../../../../Components/From/CheckoutFrom';
import LoadingSpinner from '../../../../Components/LoadingSpinner/LoadingSpinner';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
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
      const { data } = await axiosSecure.get('employee-list');
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

  const handlePaymentSubmit = () => {
    toast.success('Payment Request Successful');
    handleCloseModal();
  };

  const handleVerifyClick = async employee => {
    try {
      await axiosSecure.patch(`/employee-verify/${employee.email}`, {
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
        <table className='table-auto w-full bg-lightSecondary dark:bg-darkSecondary dark:text-lightSecondary text-darkSecondary  border-collapse border border-gray-300'>
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
                    className={`text-green-600 hover:text-green-800 ${
                      !employee.isVerified && 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!employee.isVerified}
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
        <div className='fixed inset-0 font-bold bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96'>
            <h3 className='text-lg font-bold mb-4'>Pay Employee</h3>
            <div>
              <div className='mb-4 flex items-center gap-2'>
                <label className='block text-sm font-medium'>
                  Employee Name:
                </label>
                <p>{selectedEmployee?.username || 'N/A'}</p>
              </div>
              <div className='mb-4 flex gap-2'>
                <label className='block text-sm font-medium'>Salary:</label>
                <p>{selectedEmployee?.number || 'N/A'}</p>
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium'>
                  Select Payment Date:
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={setSelectedDate}
                  dateFormat='MMMM yyyy'
                  showMonthYearPicker
                  className='w-full p-4 px-3 bg-lightSecondary dark:bg-darkSecondary py-2 border border-gray-300 rounded'
                  placeholderText='Select month and year'
                  required
                />
              </div>

              {/* Payment Gateway Input Fields */}
              <div>
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    selectedEmployee={selectedEmployee}
                    selectedDate={selectedDate}
                    handlePaymentSubmit={handlePaymentSubmit}
                  />
                </Elements>
              </div>
              <div className='mt-4 flex justify-between'>
                <button
                  type='button'
                  onClick={handleCloseModal}
                  className='bg-red-500 text-white px-4 py-2 rounded'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
