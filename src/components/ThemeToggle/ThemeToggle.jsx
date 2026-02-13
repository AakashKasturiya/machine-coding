import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <p>{theme}</p>
      <button onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
    </>
  );
};

export default ThemeToggle;
