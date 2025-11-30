import { useState } from 'react';
import { Rocket, Code2, Palette, Download, BookOpen, Terminal, FileText, Keyboard, AlertCircle, Lightbulb, Copy, Check } from 'lucide-react';


const Documentation = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Rocket className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-graphite-600 dark:text-graphite-400 text-sm leading-relaxed">
            The Minimalist Prompt Generator is a powerful visual tool for creating custom PS1 (Prompt String 1) prompts for your Bash terminal.
            Design beautiful, functional prompts without memorizing complex escape sequences.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-graphite-100 dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-800 rounded">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-5 h-5 text-accent" />
                <h3 className="text-sm font-semibold text-graphite-700 dark:text-graphite-300">Quick Start Guide</h3>
              </div>
              <ol className="space-y-2 text-xs text-graphite-600 dark:text-graphite-400">
                <li className="flex gap-2">
                  <span className="font-bold text-accent">1.</span>
                  <span>Browse available elements in the left sidebar organized by category</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">2.</span>
                  <span>Drag and drop elements into the visual editor in the center</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">3.</span>
                  <span>Click on any element to customize its color, background, and style</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">4.</span>
                  <span>Preview your prompt in real-time as you build</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">5.</span>
                  <span>Export the generated PS1 code and add it to your ~/.bashrc file</span>
                </li>
              </ol>
            </div>

            <div className="p-4 bg-graphite-100 dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-800 rounded">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-accent" />
                <h3 className="text-sm font-semibold text-graphite-700 dark:text-graphite-300">Installation</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-graphite-600 dark:text-graphite-400 mb-2">After generating your prompt, add it to your shell configuration:</p>
                  <div className="bg-graphite-950 border border-graphite-800 p-3 rounded relative">
                    <code className="text-[10px] text-green-400 font-mono">
                      # Open your .bashrc file<br />
                      nano ~/.bashrc<br /><br />
                      # Add your PS1 export at the end<br />
                      export PS1="your_generated_code"<br /><br />
                      # Save and reload<br />
                      source ~/.bashrc
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'elements',
      title: 'Prompt Elements Reference',
      icon: <Code2 className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-graphite-600 dark:text-graphite-400 text-sm">
            Complete reference of all available prompt elements with descriptions and examples.
          </p>

          {/* System Information */}
          <div className="border border-graphite-300 dark:border-graphite-800 rounded overflow-hidden">
            <div className="bg-graphite-200 dark:bg-graphite-900 px-4 py-2 border-b border-graphite-300 dark:border-graphite-800">
              <h4 className="text-sm font-semibold text-graphite-700 dark:text-graphite-300">System Information</h4>
            </div>
            <div className="p-4">
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { code: '\\u', desc: 'Current username', example: 'john' },
                  { code: '\\h', desc: 'Hostname (short)', example: 'laptop' },
                  { code: '\\H', desc: 'Hostname (full FQDN)', example: 'laptop.local' },
                  { code: '\\s', desc: 'Shell name', example: 'bash' },
                  { code: '\\l', desc: 'Terminal device name', example: 'tty1' },
                  { code: '\\v', desc: 'Bash version', example: '5.1' },
                  { code: '\\V', desc: 'Bash version + patch', example: '5.1.16' },
                  { code: 'OS', desc: 'Operating system name', example: 'Linux' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 bg-graphite-100 dark:bg-graphite-950 rounded">
                    <code className="text-xs font-mono text-accent bg-graphite-200 dark:bg-graphite-900 px-2 py-1 rounded">{item.code}</code>
                    <div className="flex-1">
                      <p className="text-xs text-graphite-700 dark:text-graphite-300">{item.desc}</p>
                      <p className="text-[10px] text-graphite-500 mt-0.5">Example: <span className="text-accent">{item.example}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Path & Directory */}
          <div className="border border-graphite-300 dark:border-graphite-800 rounded overflow-hidden">
            <div className="bg-graphite-200 dark:bg-graphite-900 px-4 py-2 border-b border-graphite-300 dark:border-graphite-800">
              <h4 className="text-sm font-semibold text-graphite-700 dark:text-graphite-300">Path & Directory</h4>
            </div>
            <div className="p-4">
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { code: '\\w', desc: 'Full working directory path', example: '~/projects/myapp' },
                  { code: '\\W', desc: 'Current directory name only', example: 'myapp' },
                  { code: '$PWD', desc: 'Present working directory', example: '/home/user/projects' },
                  { code: '~', desc: 'Home directory symbol', example: '~' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 bg-graphite-100 dark:bg-graphite-950 rounded">
                    <code className="text-xs font-mono text-accent bg-graphite-200 dark:bg-graphite-900 px-2 py-1 rounded">{item.code}</code>
                    <div className="flex-1">
                      <p className="text-xs text-graphite-700 dark:text-graphite-300">{item.desc}</p>
                      <p className="text-[10px] text-graphite-500 mt-0.5">Example: <span className="text-accent">{item.example}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time & Date */}
          <div className="border border-graphite-300 dark:border-graphite-800 rounded overflow-hidden">
            <div className="bg-graphite-200 dark:bg-graphite-900 px-4 py-2 border-b border-graphite-300 dark:border-graphite-800">
              <h4 className="text-sm font-semibold text-graphite-700 dark:text-graphite-300">Time & Date</h4>
            </div>
            <div className="p-4">
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { code: '\\A', desc: '24-hour time (HH:MM)', example: '14:30' },
                  { code: '\\T', desc: '24-hour time with seconds', example: '14:30:45' },
                  { code: '\\t', desc: '12-hour time (HH:MM:SS)', example: '02:30:45' },
                  { code: '\\@', desc: '12-hour time with AM/PM', example: '02:30 PM' },
                  { code: '\\d', desc: 'Date (Weekday Mon DD)', example: 'Sat Nov 30' },
                  { code: '\\D{%F}', desc: 'Custom date format', example: '2025-11-30' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 bg-graphite-100 dark:bg-graphite-950 rounded">
                    <code className="text-xs font-mono text-accent bg-graphite-200 dark:bg-graphite-900 px-2 py-1 rounded whitespace-nowrap">{item.code}</code>
                    <div className="flex-1">
                      <p className="text-xs text-graphite-700 dark:text-graphite-300">{item.desc}</p>
                      <p className="text-[10px] text-graphite-500 mt-0.5">Example: <span className="text-accent">{item.example}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Git Integration */}
          <div className="border border-graphite-300 dark:border-graphite-800 rounded overflow-hidden">
            <div className="bg-graphite-200 dark:bg-graphite-900 px-4 py-2 border-b border-graphite-300 dark:border-graphite-800">
              <h4 className="text-sm font-semibold text-graphite-700 dark:text-graphite-300">Git Integration</h4>
            </div>
            <div className="p-4">
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded">
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                  Git elements require additional shell functions. These are automatically included in your export.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { code: 'git_branch', desc: 'Current git branch name', example: 'main' },
                  { code: 'git_commit', desc: 'Short commit hash', example: 'a1b2c3d' },
                  { code: 'git_status', desc: 'Repository status indicator', example: '✓ or ✗' },
                  { code: 'git_dirty', desc: 'Shows * if uncommitted changes', example: '*' },
                  { code: 'git_ahead', desc: 'Number of commits ahead', example: '↑2' },
                  { code: 'git_behind', desc: 'Number of commits behind', example: '↓1' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 bg-graphite-100 dark:bg-graphite-950 rounded">
                    <code className="text-xs font-mono text-accent bg-graphite-200 dark:bg-graphite-900 px-2 py-1 rounded whitespace-nowrap">{item.code}</code>
                    <div className="flex-1">
                      <p className="text-xs text-graphite-700 dark:text-graphite-300">{item.desc}</p>
                      <p className="text-[10px] text-graphite-500 mt-0.5">Example: <span className="text-accent">{item.example}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status & Special Characters */}
          <div className="border border-graphite-300 dark:border-graphite-800 rounded overflow-hidden">
            <div className="bg-graphite-200 dark:bg-graphite-900 px-4 py-2 border-b border-graphite-300 dark:border-graphite-800">
              <h4 className="text-sm font-semibold text-graphite-700 dark:text-graphite-300">Status & Special Characters</h4>
            </div>
            <div className="p-4">
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { code: '$', desc: 'User prompt symbol', example: '$' },
                  { code: '#', desc: 'Root/superuser prompt', example: '#' },
                  { code: '\\$', desc: 'Auto $ or # based on user', example: '$ or #' },
                  { code: '\\!', desc: 'History number', example: '42' },
                  { code: '\\#', desc: 'Command number', example: '15' },
                  { code: '\\j', desc: 'Number of background jobs', example: '2' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 bg-graphite-100 dark:bg-graphite-950 rounded">
                    <code className="text-xs font-mono text-accent bg-graphite-200 dark:bg-graphite-900 px-2 py-1 rounded">{item.code}</code>
                    <div className="flex-1">
                      <p className="text-xs text-graphite-700 dark:text-graphite-300">{item.desc}</p>
                      <p className="text-[10px] text-graphite-500 mt-0.5">Example: <span className="text-accent">{item.example}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'colors',
      title: 'Color Codes & Styling',
      icon: <Palette className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-graphite-600 dark:text-graphite-400 text-sm">
            Customize your prompt with colors and text formatting. The generator handles all escape sequences automatically.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Standard Colors */}
            <div className="border border-graphite-300 dark:border-graphite-800 rounded overflow-hidden">
              <div className="bg-graphite-200 dark:bg-graphite-900 px-4 py-2 border-b border-graphite-300 dark:border-graphite-800">
                <h4 className="text-sm font-semibold text-graphite-700 dark:text-graphite-300">Standard Colors</h4>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { name: 'Black', code: '30', bg: '#000000' },
                  { name: 'Red', code: '31', bg: '#ff0000' },
                  { name: 'Green', code: '32', bg: '#00ff00' },
                  { name: 'Yellow', code: '33', bg: '#ffff00' },
                  { name: 'Blue', code: '34', bg: '#0000ff' },
                  { name: 'Magenta', code: '35', bg: '#ff00ff' },
                  { name: 'Cyan', code: '36', bg: '#00ffff' },
                  { name: 'White', code: '37', bg: '#ffffff' }
                ].map((color) => (
                  <div key={color.code} className="flex items-center gap-3 p-2 bg-graphite-100 dark:bg-graphite-950 rounded">
                    <div className="w-8 h-8 rounded border border-graphite-400 dark:border-graphite-700" style={{ backgroundColor: color.bg }}></div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-graphite-700 dark:text-graphite-300">{color.name}</p>
                      <code className="text-[10px] text-graphite-500">\\e[{color.code}m</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Text Formatting */}
            <div className="border border-graphite-300 dark:border-graphite-800 rounded overflow-hidden">
              <div className="bg-graphite-200 dark:bg-graphite-900 px-4 py-2 border-b border-graphite-300 dark:border-graphite-800">
                <h4 className="text-sm font-semibold text-graphite-700 dark:text-graphite-300">Text Formatting</h4>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { name: 'Bold', code: '1', example: 'Bold Text' },
                  { name: 'Dim', code: '2', example: 'Dim Text' },
                  { name: 'Italic', code: '3', example: 'Italic Text' },
                  { name: 'Underline', code: '4', example: 'Underlined' },
                  { name: 'Blink', code: '5', example: 'Blinking' },
                  { name: 'Reverse', code: '7', example: 'Reversed' },
                  { name: 'Reset', code: '0', example: 'Normal' }
                ].map((format) => (
                  <div key={format.code} className="flex items-start gap-3 p-2 bg-graphite-100 dark:bg-graphite-950 rounded">
                    <code className="text-xs font-mono text-accent bg-graphite-200 dark:bg-graphite-900 px-2 py-1 rounded">\\e[{format.code}m</code>
                    <div className="flex-1">
                      <p className="text-xs text-graphite-700 dark:text-graphite-300">{format.name}</p>
                      <p className="text-[10px] text-graphite-500 mt-0.5">{format.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Pro Tip</h4>
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  Use the color picker in the visual editor to select any color. The generator will automatically convert it to the appropriate terminal color code.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'export',
      title: 'Export & Usage',
      icon: <Download className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-graphite-600 dark:text-graphite-400 text-sm">
            Export your custom prompt in multiple formats and learn how to apply it to your terminal.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                format: 'Plain Text',
                icon: <FileText className="w-5 h-5" />,
                ext: 'txt',
                desc: 'Raw PS1 code ready to paste into your .bashrc file',
                usage: 'Copy and paste directly into your shell configuration'
              },
              {
                format: 'HTML',
                icon: <Code2 className="w-5 h-5" />,
                ext: 'html',
                desc: 'HTML code block with syntax highlighting',
                usage: 'Perfect for documentation and blog posts'
              },
              {
                format: 'Markdown',
                icon: <BookOpen className="w-5 h-5" />,
                ext: 'md',
                desc: 'Markdown code block for README files',
                usage: 'Great for GitHub repos and wikis'
              }
            ].map((item) => (
              <div key={item.format} className="border border-graphite-300 dark:border-graphite-800 rounded overflow-hidden">
                <div className="bg-graphite-200 dark:bg-graphite-900 px-4 py-3 border-b border-graphite-300 dark:border-graphite-800">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h3 className="text-sm font-semibold text-graphite-700 dark:text-graphite-300">{item.format}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-3">
                    <code className="text-xs bg-graphite-200 dark:bg-graphite-950 border border-graphite-300 dark:border-graphite-800 px-2 py-1 rounded">
                      .{item.ext}
                    </code>
                  </div>
                  <p className="text-xs text-graphite-600 dark:text-graphite-400 mb-2">{item.desc}</p>
                  <p className="text-[10px] text-graphite-500">{item.usage}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-graphite-300 dark:border-graphite-800 rounded overflow-hidden">
            <div className="bg-graphite-200 dark:bg-graphite-900 px-4 py-2 border-b border-graphite-300 dark:border-graphite-800">
              <h4 className="text-sm font-semibold text-graphite-700 dark:text-graphite-300">How to Apply Your Prompt</h4>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h5 className="text-xs font-semibold text-graphite-700 dark:text-graphite-300 mb-2">For Bash (Linux/Mac)</h5>
                <div className="bg-graphite-950 border border-graphite-800 p-3 rounded relative">
                  <button
                    onClick={() => copyToClipboard('echo \'export PS1="your_prompt_here"\' >> ~/.bashrc\nsource ~/.bashrc', 'bash')}
                    className="absolute top-2 right-2 p-1.5 bg-graphite-800 hover:bg-graphite-700 rounded text-graphite-400 hover:text-graphite-200"
                  >
                    {copiedCode === 'bash' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <code className="text-xs text-green-400 font-mono block">
                    # Add to ~/.bashrc<br />
                    echo 'export PS1="your_prompt_here"' &gt;&gt; ~/.bashrc<br />
                    source ~/.bashrc
                  </code>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-graphite-700 dark:text-graphite-300 mb-2">For Zsh (Mac/Linux)</h5>
                <div className="bg-graphite-950 border border-graphite-800 p-3 rounded relative">
                  <button
                    onClick={() => copyToClipboard('echo \'export PS1="your_prompt_here"\' >> ~/.zshrc\nsource ~/.zshrc', 'zsh')}
                    className="absolute top-2 right-2 p-1.5 bg-graphite-800 hover:bg-graphite-700 rounded text-graphite-400 hover:text-graphite-200"
                  >
                    {copiedCode === 'zsh' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <code className="text-xs text-green-400 font-mono block">
                    # Add to ~/.zshrc<br />
                    echo 'export PS1="your_prompt_here"' &gt;&gt; ~/.zshrc<br />
                    source ~/.zshrc
                  </code>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-graphite-700 dark:text-graphite-300 mb-2">Temporary Testing</h5>
                <div className="bg-graphite-950 border border-graphite-800 p-3 rounded relative">
                  <button
                    onClick={() => copyToClipboard('export PS1="your_prompt_here"', 'temp')}
                    className="absolute top-2 right-2 p-1.5 bg-graphite-800 hover:bg-graphite-700 rounded text-graphite-400 hover:text-graphite-200"
                  >
                    {copiedCode === 'temp' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <code className="text-xs text-green-400 font-mono block">
                    # Test without saving (current session only)<br />
                    export PS1="your_prompt_here"
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'shortcuts',
      title: 'Keyboard Shortcuts',
      icon: <Keyboard className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-graphite-600 dark:text-graphite-400 text-sm">
            Speed up your workflow with these keyboard shortcuts.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { key: 'Ctrl + Z', action: 'Undo last change' },
              { key: 'Ctrl + Y', action: 'Redo last undone change' },
              { key: 'Ctrl + S', action: 'Save configuration' },
              { key: 'Ctrl + E', action: 'Export prompt code' },
              { key: 'Delete', action: 'Remove selected element' },
              { key: 'Backspace', action: 'Remove selected element' },
              { key: 'Ctrl + C', action: 'Copy prompt code' },
              { key: 'Ctrl + D', action: 'Duplicate selected element' },
              { key: 'Arrow Keys', action: 'Navigate between elements' },
              { key: 'Esc', action: 'Deselect current element' }
            ].map((shortcut, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-graphite-100 dark:bg-graphite-950 border border-graphite-300 dark:border-graphite-800 rounded">
                <kbd className="px-3 py-1.5 bg-graphite-200 dark:bg-graphite-900 border border-graphite-400 dark:border-graphite-700 rounded text-xs font-mono text-graphite-700 dark:text-graphite-300 whitespace-nowrap">
                  {shortcut.key}
                </kbd>
                <span className="text-xs text-graphite-600 dark:text-graphite-400">{shortcut.action}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: <AlertCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-graphite-600 dark:text-graphite-400 text-sm">
            Common issues and their solutions.
          </p>

          <div className="space-y-3">
            {[
              {
                issue: 'Colors not showing in terminal',
                solution: 'Ensure your terminal supports 256 colors. Try running: echo $TERM. It should show "xterm-256color" or similar.'
              },
              {
                issue: 'Git information not displaying',
                solution: 'Make sure you\'re in a git repository and that git is installed. Run: git --version to verify.'
              },
              {
                issue: 'Prompt too long or wrapping incorrectly',
                solution: 'Use \\[ and \\] around color codes to prevent wrapping issues. The generator does this automatically.'
              },
              {
                issue: 'Special characters showing as boxes',
                solution: 'Your terminal font may not support Unicode. Try using a font like "Fira Code", "JetBrains Mono", or "Cascadia Code".'
              },
              {
                issue: 'Prompt not updating after editing .bashrc',
                solution: 'Run: source ~/.bashrc to reload your configuration, or open a new terminal window.'
              },
              {
                issue: 'Elements showing literal codes instead of values',
                solution: 'Make sure you\'re using double quotes (") not single quotes (\') around your PS1 export.'
              }
            ].map((item, idx) => (
              <div key={idx} className="border border-graphite-300 dark:border-graphite-800 rounded overflow-hidden">
                <div className="bg-red-50 dark:bg-red-950/20 px-4 py-2 border-b border-red-200 dark:border-red-900">
                  <h4 className="text-sm font-semibold text-red-800 dark:text-red-300">{item.issue}</h4>
                </div>
                <div className="p-4 bg-graphite-100 dark:bg-graphite-950">
                  <p className="text-xs text-graphite-600 dark:text-graphite-400">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      icon: <Lightbulb className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-graphite-600 dark:text-graphite-400 text-sm">
            Tips for creating effective and beautiful terminal prompts.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Keep it Concise',
                desc: 'A prompt that\'s too long can make your terminal feel cramped. Focus on the most important information.',
                icon: '📏'
              },
              {
                title: 'Use Color Wisely',
                desc: 'Too many colors can be distracting. Stick to 2-3 main colors for a clean, professional look.',
                icon: '🎨'
              },
              {
                title: 'Include Context',
                desc: 'Show current directory, git branch, and user info to always know where you are.',
                icon: '📍'
              },
              {
                title: 'Test Readability',
                desc: 'Ensure your prompt is readable on both light and dark terminal backgrounds.',
                icon: '👁️'
              },
              {
                title: 'Add Visual Separators',
                desc: 'Use symbols like →, |, or • to separate different sections of your prompt.',
                icon: '➡️'
              },
              {
                title: 'Consider Performance',
                desc: 'Git functions can slow down your prompt in large repos. Use them selectively.',
                icon: '⚡'
              }
            ].map((tip, idx) => (
              <div key={idx} className="p-4 bg-graphite-100 dark:bg-graphite-950 border border-graphite-300 dark:border-graphite-800 rounded">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-graphite-700 dark:text-graphite-300 mb-1">{tip.title}</h4>
                    <p className="text-xs text-graphite-600 dark:text-graphite-400">{tip.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded">
            <h4 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">Example: A Well-Designed Prompt</h4>
            <div className="bg-graphite-950 border border-graphite-800 p-3 rounded">
              <code className="text-xs font-mono">
                <span className="text-cyan-400">user</span>
                <span className="text-graphite-500">@</span>
                <span className="text-green-400">hostname</span>
                <span className="text-graphite-500"> in </span>
                <span className="text-yellow-400">~/projects/myapp</span>
                <span className="text-graphite-500"> on </span>
                <span className="text-purple-400">main</span>
                <span className="text-red-400">*</span>
                <br />
                <span className="text-accent">→</span>
                <span className="text-graphite-400"> </span>
              </code>
            </div>
            <p className="text-xs text-green-700 dark:text-green-400 mt-2">
              This prompt shows username, hostname, current directory, git branch, and dirty status - all in a clean, readable format.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-graphite-50 dark:bg-graphite-950 overflow-auto no-scrollbar">
      <div className="px-4 py-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-graphite-800 dark:text-graphite-200 mb-2">Documentation</h1>
          <p className="text-sm text-graphite-600 dark:text-graphite-400">
            Complete guide to creating beautiful terminal prompts with the Minimalist Prompt Generator
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className="sticky top-6 bg-graphite-100 dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-800 rounded p-4">
              <h2 className="text-xs uppercase tracking-wider text-graphite-600 dark:text-graphite-400 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Table of Contents
              </h2>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-center gap-2 p-2 text-graphite-600 dark:text-graphite-400 hover:text-accent hover:bg-graphite-200 dark:hover:bg-graphite-800 rounded text-sm transition-colors"
                    >
                      {section.icon}
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="space-y-8">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-6"
                >
                  <div className="bg-graphite-100 dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-800 rounded overflow-hidden">
                    <div className="bg-graphite-200 dark:bg-graphite-800 px-6 py-4 border-b border-graphite-300 dark:border-graphite-700">
                      <div className="flex items-center gap-3">
                        <div className="text-accent">{section.icon}</div>
                        <h2 className="text-lg font-bold text-graphite-800 dark:text-graphite-200">
                          {section.title}
                        </h2>
                      </div>
                    </div>
                    <div className="p-6">
                      {section.content}
                    </div>
                  </div>
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