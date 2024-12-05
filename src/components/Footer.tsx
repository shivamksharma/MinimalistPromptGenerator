import React from "react";
import { Github, Twitter, Book } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100/50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-700/50 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Built with ❤️ for the terminal community
          </div>
          <div className="flex items-center space-x-6">
            {/* <a */}
            {/*   href="/docs" */}
            {/*   className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors flex items-center space-x-2" */}
            {/* > */}
            {/*   <Book className="w-4 h-4" /> */}
            {/*   <span>Documentation</span> */}
            {/* </a> */}
            <a
              href="https://github.com/shivamksharma/MinimalistPromptGenerator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

