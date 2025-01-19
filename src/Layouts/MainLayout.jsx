import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';
import useAuth from '../hooks/useAuth';

const MainLayout = () => {
  const { value } = useAuth();

  return (
    <div>
      <div className='bg-lightPrimary  dark:bg-darkPrimary font-Roboto  mx-auto md:mx-auto scroll-smooth   '>
        <div className='flex'>
          <div className='fixed top-0 h-[90%]'>
            <Sidebar />
          </div>
          <div className='min-h-[calc(100vh-30px)]  w-full'>
            <header>
              <Navbar />
            </header>
            <div
              className={`${
                value
                  ? 'mt-20  md:ml-64 ml-20  transition-all duration-500'
                  : 'mt-20 ml-2 md:ml-20 lg:ml-20 transition-all duration-500 '
              } `}
            >
              <Outlet />
            </div>
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};
export default MainLayout;
