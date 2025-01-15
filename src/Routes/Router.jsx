import { createBrowserRouter } from 'react-router-dom';
import ContactUs from '../Pages/ContactUs/ContactUs';
import EmployeeList from '../Pages/Dashboard/EmployeeList/EmployeeList';
import Error from '../Pages/Error/Error';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
import MainLayout from './../Layouts/MainLayout';
import HrRoute from './HrRoute';

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
        path: '/employeeList',
        element: (
          <HrRoute>
            <EmployeeList />,
          </HrRoute>
        ),
      },
    ],
  },
]);
export default router;
