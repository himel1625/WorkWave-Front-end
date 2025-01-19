import { FaListOl } from 'react-icons/fa';
import { RiBankCardLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';
const AdminMenu = () => {
  const { value } = useAuth();
  return (
    <div>
      <div>
        <Link
          to='/allEmployeeList'
          className='flex items-center py-2 hover:bg-gray-700 transition-colors rounded-lg '
        >
          <FaListOl className='text-lg' />
          {value && <span className='md:ml-4 ml-1 '>All-Employee-List</span>}
        </Link>
        <Link
          to='/payrollApproval'
          className='flex items-center py-2 hover:bg-gray-700 transition-colors rounded-lg'
        >
          <RiBankCardLine className='text-lg' />
          {value && <span className='ml-4'>Payroll-Approval</span>}
        </Link>
      </div>
    </div>
  );
};
export default AdminMenu;
