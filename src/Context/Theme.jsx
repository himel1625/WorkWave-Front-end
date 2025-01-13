import { useEffect, useState } from 'react';
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri';

const Theme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div>
      <button onClick={toggleTheme} className='' aria-label='Toggle Theme'>
        {theme === 'dark' ? (
          <RiSunLine className='w-6 h-6 text-white' />
        ) : (
          <RiMoonClearLine className='w-6 h-6  text-black' />
        )}
      </button>
    </div>
  );
};

export default Theme;
