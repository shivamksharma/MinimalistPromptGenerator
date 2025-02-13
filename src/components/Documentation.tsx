import React from 'react';
import { Rocket, Code2, Palette, Download, BookOpen, Terminal, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Documentation = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Rocket className="w-5 h-5" />,
      content: (
        <>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Welcome to the Minimalist Prompt Generator! This tool helps you create custom PS1 prompts 
            for your terminal with an intuitive visual interface.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Terminal className="w-6 h-6 text-teal-400" />
              <div>
                <h3 className="font-medium mb-1">Quick Start</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  1. Drag elements from the sidebar<br/>
                  2. Customize colors and styles<br/>
                  3. Export and use in your terminal
                </p>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'elements',
      title: 'Prompt Elements',
      icon: <Code2 className="w-5 h-5" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'h', label: 'Hostname (short)', example: 'hostname' },
            { id: 'H', label: 'Hostname (full)', example: 'hostname.local' },
            { id: 'u', label: 'Username', example: 'user' },
            { id: 'w', label: 'Current Directory', example: '/path/to/dir' },
            { id: 'W', label: 'Directory Basename', example: 'dir' },
            { id: 't', label: 'Time (12h)', example: '02:30 PM' },
            { id: 'T', label: 'Time with Seconds', example: '14:30:45' },
            { id: 'd', label: 'Date', example: 'Mon Jan 01' },
            { id: '$', label: 'Exit Status', example: '0' },
            { id: 'space', label: 'Space', example: ' ' }
          ].map((item) => (
            <div key={item.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-teal-400">\{item.id}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
              </div>
              <div className="text-sm font-mono p-2 bg-gray-50 dark:bg-gray-700 rounded">
                {item.example}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'customization',
      title: 'Customization',
      icon: <Palette className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-teal-50/50 to-blue-50/50 dark:from-gray-800 dark:to-gray-800 rounded-xl">
            <h3 className="text-lg font-semibold mb-3">Style Options</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                Color Picker for foreground and background
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                Bold text formatting
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                Real-time preview updates
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'export',
      title: 'Export Options',
      icon: <Download className="w-5 h-5" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { format: 'Plain Text', icon: <FileText className="w-5 h-5" />, ext: 'txt' },
            { format: 'HTML', icon: <Code2 className="w-5 h-5" />, ext: 'html' },
            { format: 'Markdown', icon: <BookOpen className="w-5 h-5" />, ext: 'md' }
          ].map((item) => (
            <div key={item.format} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                {item.icon}
                <h3 className="font-semibold">{item.format}</h3>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  .{item.ext}
                </span>
              </div>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="md:w-64 md:sticky md:top-20 md:h-[calc(100vh-6rem)]">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Contents
              </h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a 
                      href={`#${section.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
                    >
                      {section.icon}
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            <div className="space-y-12">
              {sections.map((section) => (
                <section 
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-8">
                    {section.icon}
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                      {section.title}
                    </h2>
                  </div>
                  {section.content}
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Documentation; 