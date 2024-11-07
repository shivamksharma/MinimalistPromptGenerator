import React from 'react';
import { X, FileText, Code, FileCode, Download, Copy, Check } from 'lucide-react';
import { usePS1Context } from '../context/PS1Context';

type ExportFormat = 'plain' | 'html' | 'markdown';

interface ExportOption {
  id: ExportFormat;
  label: string;
  icon: React.ReactNode;
  getContent: (code: string) => string;
}

const exportOptions: ExportOption[] = [
  {
    id: 'plain',
    label: 'Plain Text',
    icon: <FileText className="w-4 h-4" />,
    getContent: (code) => code,
  },
  {
    id: 'html',
    label: 'HTML',
    icon: <Code className="w-4 h-4" />,
    getContent: (code) => `<pre><code class="language-bash">${code}</code></pre>`,
  },
  {
    id: 'markdown',
    label: 'Markdown',
    icon: <FileCode className="w-4 h-4" />,
    getContent: (code) => `\`\`\`bash\n${code}\n\`\`\``,
  },
];

interface SettingsMenuProps {
  onClose: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ onClose }) => {
  const { elements } = usePS1Context();
  const [selectedFormat, setSelectedFormat] = React.useState<ExportFormat>('plain');
  const [copied, setCopied] = React.useState(false);

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
    const code = generatePS1Code();
    const formattedCode = exportOptions.find(opt => opt.id === selectedFormat)?.getContent(code) || code;
    await navigator.clipboard.writeText(formattedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const code = generatePS1Code();
    const formattedCode = exportOptions.find(opt => opt.id === selectedFormat)?.getContent(code) || code;
    
    const extensions: Record<ExportFormat, string> = {
      plain: 'txt',
      html: 'html',
      markdown: 'md'
    };
    
    const blob = new Blob([formattedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ps1-config.${extensions[selectedFormat]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 relative">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Export Options</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {exportOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedFormat(option.id)}
                    className={`p-4 rounded-lg border transition-all flex flex-col items-center justify-center gap-2
                      ${selectedFormat === option.id
                        ? 'bg-teal-400/10 border-teal-400/50 text-teal-400'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                  >
                    {option.icon}
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all
                    ${copied
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                      : 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700'
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
                      Copy to Clipboard
                    </>
                  )}
                </button>

                <button
                  onClick={downloadCode}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2
                    bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 
                    border border-gray-200 dark:border-gray-700/50 
                    hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Download className="w-4 h-4" />
                  Download File
                </button>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</h4>
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                  <code className="text-sm font-mono">
                    {exportOptions.find(opt => opt.id === selectedFormat)?.getContent(generatePS1Code())}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;