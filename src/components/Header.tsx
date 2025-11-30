import { useState } from 'react';
import { Terminal, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import SettingsMenu from './SettingsMenu';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="bg-graphite-50 dark:bg-graphite-950 border-b border-graphite-200 dark:border-graphite-800 sticky top-0 z-50">
        <div className="px-4 py-2.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-accent" />
              <h1 className="text-xs uppercase tracking-wider text-graphite-700 dark:text-graphite-300">
                <Link to="/">PS1 Generator</Link>
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-1.5 border border-graphite-800 text-graphite-500 hover:border-graphite-600 hover:text-graphite-400"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-3.5 h-3.5" />
                ) : (
                  <Moon className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="p-1.5 border border-graphite-800 text-graphite-500 hover:border-graphite-600 hover:text-graphite-400"
                aria-label="Settings"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {showSettings && <SettingsMenu onClose={() => setShowSettings(false)} />}
    </>
  );
};

export default Header;