import { useEffect, useState, useRef } from 'react';
import Prism from 'prismjs';
import { usePS1Context } from '../context/PS1Context';

const CodePreview = () => {
  const { elements } = usePS1Context();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [elements]);

  const generatePS1Code = () => {
    if (elements.length === 0) return 'PS1="\\$ "';

    return `PS1 = '${elements
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

        let content = `\\${el.id}`;

        // Handle special cases
        if (el.id === 'git_commit') {
          content = '$(git rev-parse --short HEAD 2>/dev/null)';
        }
        else if (el.id === 'git_status') {
          content = '$(if git diff --quiet 2>/dev/null; then echo "✓"; else echo "✗"; fi)';
        }
        else if (el.id === 'os') {
          content = '$(uname -s)';
        }
        // Handle literal symbol characters
        else if (el.id === 'colon') {
          content = ':';
        }
        else if (el.id === 'at') {
          content = '@';
        }
        else if (el.id === 'dot') {
          content = '•';
        }
        else if (el.id === 'backslash') {
          content = '\\\\';
        }
        else if (el.id === 'langle') {
          content = '⟨';
        }
        else if (el.id === 'rangle') {
          content = '⟩';
        }
        // Handle icons and nerd icons (use the label/character directly)
        else if (el.id.startsWith('nf_') || ['check', 'cross', 'arrow_r', 'arrow_l', 'lambda', 'star', 'heart', 'lightning', 'gear', 'lock'].includes(el.id)) {
          content = el.label;
        }

        return `${styles.join('')}${content}\\[\\e[0m\\]`;
      })
      .join('')}'`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatePS1Code());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const preRef = useRef<HTMLPreElement | null>(null);

  return (
    <div className="bg-graphite-100 dark:bg-graphite-950 border border-graphite-300 dark:border-graphite-800 h-full flex flex-col min-h-0 min-w-0">
      <div className="px-3 py-2.5 border-b border-graphite-300 dark:border-graphite-800 flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-wider text-graphite-600 dark:text-graphite-400">Generated Code</h2>
        <button
          onClick={handleCopy}
          className="px-2 py-0.5 text-[10px] uppercase tracking-wide border border-graphite-400 dark:border-graphite-700 text-graphite-600 dark:text-graphite-500 hover:border-accent hover:text-accent"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div ref={scrollRef} className="flex-1 p-3 border-b border-graphite-300 dark:border-graphite-800 overflow-auto min-h-0 min-w-0 no-scrollbar">
        <pre ref={preRef} className="bg-graphite-200 dark:bg-graphite-900 border border-graphite-400 dark:border-graphite-800 p-3 overflow-x-auto text-xs no-scrollbar">
          <code className="language-bash text-graphite-700 dark:text-graphite-300">{generatePS1Code()}</code>
        </pre>
      </div>
      <div className="p-3">
        <p className="text-[10px] text-graphite-500 dark:text-graphite-600 flex items-start gap-2">
          <span className="bg-graphite-200 dark:bg-graphite-900 border border-graphite-400 dark:border-graphite-800 px-1.5 py-0.5 text-graphite-600 dark:text-graphite-500">~/.bashrc</span>
          <span>Add to shell config</span>
        </p>
      </div>
    </div>
  );
};

export default CodePreview;