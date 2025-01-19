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
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    try {
      await axiosSecure.put(`/update-payment-status/${id}`, {
        currentDate: formattedDate,
      });
      refetch();
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <div className='p-4 text-center'>
      <h2 className='text-xl font-semibold mb-4'>Payroll Approval</h2>
      <table className='table-auto border-collapse border border-gray-200 w-full bg-lightSecondary dark:bg-darkSecondary dark:text-lightSecondary text-darkSecondary'>
        <thead>
          <tr>
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
            const formattedPaymentDate = payroll.paymentDate
              ? format(new Date(payroll.paymentDate), 'MMMM, yyyy')
              : 'N/A';
            const currentDate = payroll.currentDate
              ? format(new Date(payroll.currentDate), 'd, MMMM, yyyy')
              : 'N/A';
            return (
              <tr key={payroll.transactionId}>
                <td className='border border-gray-300 px-4 py-2'>
                  {payroll.employeeName}
                </td>
                <td className='border border-gray-300 px-4'>
                  {payroll.designation}
                </td>
                <td className='border border-gray-300 px-4'>
                  {formattedPaymentDate}
                </td>
                <td className='border border-gray-300 px-4'>
                  {payroll.salary}
                </td>
                <td className='border border-gray-300 px-4 text-center'>
                  {payroll.transactionId}
                </td>
                <td className='border border-gray-300 px-4 text-center'>
                  <button
                    onClick={() => handleIsPayment(payroll._id)}
                    className={`text-white px-4 rounded ${
                      payroll.isPayment === true
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                    }`}
                  >
                    {payroll.isPayment ? 'Paid' : 'Pay'}
                  </button>
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center'>
                  {currentDate}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollApproval;
