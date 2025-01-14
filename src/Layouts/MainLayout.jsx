import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';

const MainLayout = () => {
  return (
    <div className='bg-lightPrimary  dark:bg-darkPrimary font-Roboto'>
      <header>
        <Navbar />
      </header>
      <div className='container mx-auto md:mx-auto scroll-smooth  min-h-[calc(100vh-45px)]   '>
        <Outlet />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
export default MainLayout;
