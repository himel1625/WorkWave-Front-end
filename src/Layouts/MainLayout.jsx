import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';

const MainLayout = () => {
  return (
    <div>
      <div className='bg-lightPrimary  dark:bg-darkPrimary font-Roboto  mx-auto md:mx-auto scroll-smooth   '>
        <div className='flex'>
          <div className='sticky top-0 z-50'>
            <Sidebar />
          </div>
          <div className='min-h-[calc(100vh-50px)]  w-full'>
            <header>
              <Navbar />
            </header>
            <Outlet />
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
