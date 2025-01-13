import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <header>Navbar</header>
      <div className='container mx-auto md:mx-auto scroll-smooth  min-h-[calc(100vh-200px)]   '>
        <Outlet />
      </div>
      <footer>Footer</footer>
    </div>
  );
};

export default MainLayout;
