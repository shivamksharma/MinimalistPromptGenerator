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
        // Handle icons and nerd icons (use the label/character directly)
        else if (el.id.startsWith('nf_') || ['check', 'cross', 'arrow_r', 'arrow_l', 'lambda', 'star', 'heart', 'lightning', 'gear', 'lock'].includes(el.id)) {
          content = el.label;
        }

        return `${styles.join('')}${content}\\[\\e[0m\\]`;
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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-graphite-100 dark:bg-graphite-950 border border-graphite-400 dark:border-graphite-700 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-graphite-300 dark:border-graphite-800">
          <h2 className="text-xs uppercase tracking-wider text-graphite-600 dark:text-graphite-400">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 text-graphite-500 dark:text-graphite-600 hover:text-graphite-700 dark:hover:text-graphite-400"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-[10px] uppercase tracking-wider text-graphite-500 dark:text-graphite-600 mb-3">Export Format</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {exportOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedFormat(option.id)}
                    className={`p-3 border flex flex-col items-center justify-center gap-1.5
                      ${selectedFormat === option.id
                        ? 'bg-accent/10 border-accent text-accent'
                        : 'border-graphite-400 dark:border-graphite-700 text-graphite-600 dark:text-graphite-500 hover:border-graphite-500 dark:hover:border-graphite-600'
                      }`}
                  >
                    {option.icon}
                    <span className="text-[10px] uppercase tracking-wide">{option.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className={`flex-1 px-3 py-2 text-[10px] uppercase tracking-wide flex items-center justify-center gap-1.5 border
                    ${copied
                      ? 'bg-accent/10 text-accent border-accent'
                      : 'border-graphite-400 dark:border-graphite-700 text-graphite-600 dark:text-graphite-500 hover:border-graphite-500 dark:hover:border-graphite-600'
                    }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>

                <button
                  onClick={downloadCode}
                  className="flex-1 px-3 py-2 text-[10px] uppercase tracking-wide flex items-center justify-center gap-1.5 border border-graphite-400 dark:border-graphite-700 text-graphite-600 dark:text-graphite-500 hover:border-graphite-500 dark:hover:border-graphite-600"
                >
                  <Download className="w-3 h-3" />
                  Download
                </button>
              </div>

              <div className="mt-3">
                <h4 className="text-[10px] uppercase tracking-wider text-graphite-500 dark:text-graphite-600 mb-2">Preview</h4>
                <pre className="bg-graphite-200 dark:bg-graphite-900 border border-graphite-400 dark:border-graphite-800 p-3 overflow-x-auto no-scrollbar">
                  <code className="text-xs text-graphite-700 dark:text-graphite-300">
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