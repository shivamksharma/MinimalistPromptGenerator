import React from 'react';
import { Terminal, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200/10 dark:border-gray-700/50 sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-teal-400 to-blue-500 p-2 rounded-lg">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              PS1 Generator
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-400 hover:text-teal-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 hover:text-teal-400" />
              )}
            </button>
            <button
              className="p-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-teal-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;