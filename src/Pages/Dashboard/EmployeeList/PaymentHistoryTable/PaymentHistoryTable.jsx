import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

const PaymentHistoryTable = () => {
  const paymentData = [
    {
      month: 'January',
      year: '2025',
      amount: 1000,
      transactionId: 'TXN12345',
    },
    {
      month: 'February',
      year: '2025',
      amount: 1500,
      transactionId: 'TXN12346',
    },
    {
      month: 'March',
      year: '2025',
      amount: 2000,
      transactionId: 'TXN12347',
    },
  ];

  return (
    <div className='overflow-x-auto dark:text-lightSecondary text-darkSecondary'>
      <table className='min-w-full table-auto'>
        <thead className=''>
          <tr>
            <th className='px-4 py-2 border-b text-left'>Month</th>
            <th className='px-4 py-2 border-b text-left'>Year</th>
            <th className='px-4 py-2 border-b text-left'>Amount</th>
            <th className='px-4 py-2 border-b text-left'>Transaction ID</th>
            <th className='px-4 py-2 border-b text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentData.map((payment, index) => (
            <tr key={index}>
              <td className='px-4 py-2 border-b'>{payment.month}</td>
              <td className='px-4 py-2 border-b'>{payment.year}</td>
              <td className='px-4 py-2 border-b'>{payment.amount}</td>
              <td className='px-4 py-2 border-b'>{payment.transactionId}</td>
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

      {/* Pagination Section */}
    </div>
  );
};

export default PaymentHistoryTable;
