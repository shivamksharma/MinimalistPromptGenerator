import React, { useEffect } from 'react';
import Prism from 'prismjs';
import { usePS1Context } from '../context/PS1Context';
import { Copy, Check } from 'lucide-react';

const CodePreview = () => {
  const { elements } = usePS1Context();
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [elements]);

  const generatePS1Code = () => {
    if (elements.length === 0) return 'PS1="\\$ "';
    
    return `PS1='${elements
      .map((el) => {
        const styles = [];
        
        if (el.fgColor) {
          const rgb = el.fgColor.replace('#', '');
          styles.push(`\\[\\e[38;2;${parseInt(rgb.slice(0, 2), 16)};${parseInt(rgb.slice(2, 4), 16)};${parseInt(rgb.slice(4, 6), 16)}m\\]`);
        }
        
        if (el.bgColor) {
          const rgb = el.bgColor.replace('#', '');
          styles.push(`\\[\\e[48;2;${parseInt(rgb.slice(0, 2), 16)};${parseInt(rgb.slice(2, 4), 16)};${parseInt(rgb.slice(4, 6), 16)}m\\]`);
        }
        
        if (el.isBold) {
          styles.push('\\[\\e[1m\\]');
        }
        
        return `${styles.join('')}\\${el.id}\\[\\e[0m\\]`;
      })
      .join('')}'`;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatePS1Code());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Generated Code</h2>
        <button
          onClick={copyToClipboard}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all
            ${copied
              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
              : 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-teal-400/50'
            }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="relative">
        <pre className="bg-gray-100/80 dark:bg-gray-800/50 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700/50">
          <code className="language-bash">{generatePS1Code()}</code>
        </pre>
      </div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <span className="bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded text-xs font-mono">~/.bashrc</span>
        <span>Add this code to your shell configuration file</span>
      </p>
    </div>
  );
};

export default CodePreview;