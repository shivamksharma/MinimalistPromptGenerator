import React, { useEffect } from 'react';
import Prism from 'prismjs';
import { usePS1Context } from '../context/PS1Context';

const CodePreview = () => {
  const { elements } = usePS1Context();

  useEffect(() => {
    Prism.highlightAll();
  }, [elements]);

  const generatePS1Code = () => {
    if (elements.length === 0) return 'PS1="\\$ "';
    
    return `PS1='${elements
      .map((el) => {
        const colorCode = el.color?.replace('#', '');
        return `\\[\\e[38;2;${parseInt(colorCode?.slice(0, 2) || 'ff', 16)};${parseInt(
          colorCode?.slice(2, 4) || 'ff',
          16
        )};${parseInt(colorCode?.slice(4, 6) || 'ff', 16)}m\\]\\${el.id}\\[\\e[0m\\]`;
      })
      .join(' ')}'`;
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Generated Code</h2>
      <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <code className="language-bash">{generatePS1Code()}</code>
      </pre>
      <p className="mt-4 text-sm text-gray-400">
        Add this code to your <code className="text-xs bg-gray-700 px-1 py-0.5 rounded">~/.bashrc</code> file
      </p>
    </div>
  );
};

export default CodePreview;