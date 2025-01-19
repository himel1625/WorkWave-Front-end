import { createBrowserRouter } from 'react-router-dom';
import ContactUs from '../Pages/ContactUs/ContactUs';

import AllEmployeeList from '../Pages/Dashboard/Admin/AllEmployeeList/AllEmployeeList';
import PayrollApproval from '../Pages/Dashboard/Admin/PayrollApproval/PayrollApproval';
import PaymentHistoryTable from '../Pages/Dashboard/EmployeeList/PaymentHistoryTable/PaymentHistoryTable';
import WorkSheetForm from '../Pages/Dashboard/EmployeeList/WorkSheetForm/WorkSheetForm';
import WorkSheetTable from '../Pages/Dashboard/EmployeeList/WorkSheetTable/WorkSheetTable';
import EmployeeInfo from '../Pages/Dashboard/HR/EmployeeInfo/EmployeeInfo';
import EmployeeList from '../Pages/Dashboard/HR/EmployeeList/EmployeeList';
import WorkRecords from '../Pages/Dashboard/HR/WorkRecords/WorkRecords';
import Error from '../Pages/Error/Error';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Setting from '../Pages/Setting/Setting';
import SignUp from '../Pages/SignUp/SignUp';
import MainLayout from './../Layouts/MainLayout';
import AdminRoute from './AdminRoute';
import EmployeeRoute from './EmployeeRoute';
import HrRoute from './HrRoute';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/setting',
        element: (
          <PrivateRoute>
            <Setting />,
          </PrivateRoute>
        ),
      },
      {
        path: '/contactUs',
        element: (
          <PrivateRoute>
            <ContactUs />,
          </PrivateRoute>
        ),
      },
      {
        path: '/allEmployeeList',
        element: (
          <AdminRoute>
            <AllEmployeeList />
          </AdminRoute>
        ),
      },
      {
        path: '/payrollApproval',
        element: (
          <AdminRoute>
            <PayrollApproval />
          </AdminRoute>
        ),
      },
      {
        path: '/employeeList',
        element: (
          <HrRoute>
            <EmployeeList />
          </HrRoute>
        ),
      },
      {
        path: '/employeeInfo/:id',
        element: (
          <HrRoute>
            <EmployeeInfo />
          </HrRoute>
        ),
      },
      {
        path: '/workRecords',
        element: (
          <HrRoute>
            <WorkRecords />
          </HrRoute>
        ),
      },
      {
        path: '/workSheetForm',
        element: (
          <EmployeeRoute>
            <WorkSheetForm />
          </EmployeeRoute>
        ),
      },
      {
        path: '/workSheetTable',
        element: (
          <EmployeeRoute>
            <WorkSheetTable />
          </EmployeeRoute>
        ),
      },
      {
        path: '/paymentHistoryTable',
        element: (
          <EmployeeRoute>
            <PaymentHistoryTable />
          </EmployeeRoute>
        ),
      },
    ],
  },
]);
export default router;
