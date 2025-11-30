import { Github, Book, Layers } from "lucide-react";
import { FaRedditAlien } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-graphite-50 dark:bg-graphite-950 border-t border-graphite-200 dark:border-graphite-800 py-2">
      <div className="px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-[10px] text-graphite-500 dark:text-graphite-600 uppercase tracking-wide">
            Built for terminal users
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to="/presets"
              className="text-graphite-500 dark:text-graphite-600 hover:text-accent flex items-center space-x-1"
            >
              <Layers className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-wide">Presets</span>
            </Link>
            <Link
              to="/documentation"
              className="text-graphite-500 dark:text-graphite-600 hover:text-accent flex items-center space-x-1"
            >
              <Book className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-wide">Docs</span>
            </Link>
            <a
              href="https://github.com/shivamksharma/MinimalistPromptGenerator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-graphite-500 dark:text-graphite-600 hover:text-accent"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://reddit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-graphite-500 dark:text-graphite-600 hover:text-accent"
            >
              <FaRedditAlien className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

