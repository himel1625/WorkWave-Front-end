import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns'; // Import date-fns format function
import React from 'react';
import LoadingSpinner from '../../../../Components/LoadingSpinner/LoadingSpinner';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PayrollApproval = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['payroll'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/payroll');
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  const handleIsPayment = async id => {
    await axiosSecure.put(`/update-payment-status/${id}`);
    refetch();
  };

  return (
    <div className='p-4 text-center'>
      <h2 className='text-xl font-semibold mb-4'>Payroll Approval</h2>
      <table className='table-auto border-collapse border border-gray-200 w-full'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border border-gray-300 px-4 py-2'>Employee Name</th>
            <th className='border border-gray-300 px-4 py-2'>Designation</th>
            <th className='border border-gray-300 px-4 py-2'>Month, Year</th>
            <th className='border border-gray-300 px-4 py-2'>Amount</th>
            <th className='border border-gray-300 px-4 py-2'>Transaction Id</th>
            <th className='border border-gray-300 px-4 py-2'>Pay</th>
            <th className='border border-gray-300 px-4 py-2'>Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(payroll => {
            // Format the paymentDate to 'MMMM, yyyy' (e.g., 'January, 2025')
            const formattedPaymentDate = format(
              new Date(payroll.paymentDate),
              'MMMM, yyyy',
            );
            return (
              <tr key={payroll.transactionId}>
                <td className='border border-gray-300 px-4 py-2'>
                  {payroll.employeeName}
                </td>
                <td className='border border-gray-300 px-4 '>
                  {payroll.designation}
                </td>
                <td className='border border-gray-300 px-4 '>
                  {formattedPaymentDate}
                </td>
                <td className='border border-gray-300 px-4  '>
                  {payroll.salary}
                </td>
                <td className='border border-gray-300 px-4  text-center'>
                  {payroll.transactionId}
                </td>
                <td className='border border-gray-300 px-4  text-center'>
                  <button
                    onClick={() => handleIsPayment(payroll._id)}
                    className='bg-green-500 text-white px-4 rounded'
                  >
                    {payroll.isPayment ? 'Paid' : 'Pay'}
                  </button>
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center'></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollApproval;
