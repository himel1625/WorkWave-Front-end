import { createBrowserRouter } from 'react-router-dom';
import ContactUs from '../Pages/ContactUs/ContactUs';

import PaymentHistoryTable from '../Pages/Dashboard/EmployeeList/PaymentHistoryTable/PaymentHistoryTable';
import WorkSheetForm from '../Pages/Dashboard/EmployeeList/WorkSheetForm/WorkSheetForm';
import WorkSheetTable from '../Pages/Dashboard/EmployeeList/WorkSheetTable/WorkSheetTable';
import Error from '../Pages/Error/Error';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
import MainLayout from './../Layouts/MainLayout';
import EmployeeRoute from './EmployeeRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/contactUs',
        element: <ContactUs />,
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
