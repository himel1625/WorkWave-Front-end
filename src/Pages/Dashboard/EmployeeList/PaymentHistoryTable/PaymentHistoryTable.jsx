import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../../Components/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PaymentHistoryTable = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ['payroll', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const { data } = await axiosSecure.get(`/payment-history/${user.email}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='overflow-x-auto dark:text-lightSecondary text-darkSecondary'>
      <table className='w-full table-auto border-collapse border bg-lightSecondary dark:bg-darkSecondary dark:text-lightSecondary text-darkSecondary border-gray-200 text-center'>
        <thead>
          <tr className=''>
            <th className='border border-gray-300 px-4 py-2'>Month</th>
            <th className='border border-gray-300 px-4 py-2'>Year</th>
            <th className='border border-gray-300 px-4 py-2'>Amount</th>
            <th className='border border-gray-300 px-4 py-2'>Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.length > 0 ? (
            paymentHistory.map(payment => {
              const paymentDate = new Date(payment.paymentDate);
              const month = paymentDate.toLocaleString('default', {
                month: 'long',
              });
              const year = paymentDate.getFullYear();

              return (
                <tr key={payment._id}>
                  <td className='border border-gray-300 px-4 py-2'>{month}</td>
                  <td className='border border-gray-300 px-4 py-2'>{year}</td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {payment.salary}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {payment.transactionId}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan='4' className='text-center py-6 text-gray-500'>
                No payment history available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistoryTable;
