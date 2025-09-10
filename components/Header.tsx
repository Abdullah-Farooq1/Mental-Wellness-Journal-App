
import React from 'react';
import { LogoutIcon, MoonIcon, SunIcon } from './icons/UtilityIcons';

interface HeaderProps {
  user: string;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, isDarkMode, toggleTheme }) => {
  return (
    <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v0a9 9 0 01-9 9H3m0-9a9 9 0 019 9v0m0 9a9 9 0 019-9h0m9 0a9 9 0 01-9-9v0" />
            </svg>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">Zenith Journal</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 hidden sm:block">
              Welcome, {user}
            </span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
            <button
              onClick={onLogout}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-900"
              aria-label="Logout"
            >
              <LogoutIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
