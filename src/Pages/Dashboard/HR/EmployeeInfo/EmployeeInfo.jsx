import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import LoadingSpinner from '../../../../Components/LoadingSpinner/LoadingSpinner';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const EmployeeInfo = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: paymentData, isLoading } = useQuery({
    queryKey: ['details'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payment-history-details/${id}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const chartData = paymentData.map(entry => {
    const paymentDate = new Date(entry.paymentDate);
    const month = paymentDate.toLocaleString('default', { month: 'long' });
    const year = paymentDate.getFullYear();

    return {
      name: `${month} ${year}`,
      salary: parseInt(entry.salary),
      designation: entry.designation,
      employeeName: entry.employeeName,
    };
  });
  return (
    <div className='dark:text-lightSecondary text-darkSecondary flex items-center justify-center flex-col'>
      <p className='text-xl mt-2'>{`EmployeeName: ${chartData[0]?.employeeName}`}</p>
      <p className='text-xl mt-2'>{`Designation: ${chartData[0]?.designation}`}</p>
      <div className='mt-20 w-full px-4'>
        <ResponsiveContainer width='100%' height={600}>
          <ComposedChart data={chartData}>
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A202C',
                color: '#E2E8F0',
                borderRadius: '8px',
              }}
              cursor={{ fill: 'rgba(31, 41, 55, 0.1)' }}
            />
            <Legend />
            <CartesianGrid stroke='#E2E8F0' />
            <Area
              type='monotone'
              dataKey='salary'
              fill='rgba(37, 99, 235, 0.2)'
              stroke='#2563EB'
            />
            <Bar dataKey='salary' barSize={30} fill='#FBBF24' />
            <Line type='monotone' dataKey='salary' stroke='#10B981' />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default EmployeeInfo;
