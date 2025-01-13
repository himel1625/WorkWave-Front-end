import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';

const MainLayout = () => {
  return (
    <div className='bg-lightPrimary font-Roboto dark:bg-darkPrimary'>
      <header>
        <Navbar />
      </header>
      <div className='container mx-auto md:mx-auto scroll-smooth  min-h-[calc(100vh-68px)]   '>
        <Outlet />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
export default MainLayout;
