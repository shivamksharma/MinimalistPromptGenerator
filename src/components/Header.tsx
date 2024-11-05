import React from 'react';
import { Terminal, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Terminal className="w-8 h-8 text-teal-400" />
          <h1 className="text-xl font-semibold">PS1 Generator</h1>
        </div>
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Settings className="w-6 h-6 text-gray-400 hover:text-teal-400" />
        </button>
      </div>
    </header>
  );
};

export default Header;