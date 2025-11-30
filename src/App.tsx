import React from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import DraggableElements from './components/DraggableElements';
import VisualEditor from './components/VisualEditor';
import CodePreview from './components/CodePreview';
import Footer from './components/Footer';
import { PS1Provider } from './context/PS1Context';
import { usePS1Context } from './context/PS1Context';
import { ThemeProvider } from './context/ThemeContext';
import Documentation from './components/Documentation';
import Presets from './components/Presets';

function DndProvider({ children }: { children: React.ReactNode }) {
  const { addElement } = usePS1Context();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === 'editor') {
      const elementData = elements.find(el => el.id === active.id);
      if (elementData) {
        addElement(elementData);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  );
}

const elements = [
  // System Information
  { id: 'u', label: 'username', category: 'system' },
  { id: 'h', label: 'hostname', category: 'system' },
  { id: 'H', label: 'hostname (full)', category: 'system' },
  { id: 's', label: 'shell', category: 'system' },
  { id: 'l', label: 'terminal', category: 'system' },
  { id: 'os', label: 'OS name', category: 'system' },
  { id: 'v', label: 'bash version', category: 'system' },
  { id: 'V', label: 'bash release', category: 'system' },

  // Path & Directory
  { id: 'w', label: 'full path', category: 'path' },
  { id: 'W', label: 'directory', category: 'path' },
  { id: 'PWD', label: '$PWD', category: 'path' },
  { id: '~', label: '~', category: 'path' },

  // Time & Date
  { id: 'A', label: 'time (HH:MM)', category: 'time' },
  { id: 'T', label: 'time (HH:MM:SS)', category: 'time' },
  { id: 't', label: 'time (12h)', category: 'time' },
  { id: '@', label: 'time (12h AM/PM)', category: 'time' },
  { id: 'd', label: 'date (Weekday Mon DD)', category: 'time' },
  { id: 'D', label: 'date (MM/DD/YY)', category: 'time' },

  // Git Integration
  { id: 'git_branch', label: 'git branch', category: 'git' },
  { id: 'git_commit', label: 'commit hash', category: 'git' },
  { id: 'git_status', label: 'repo status', category: 'git' },
  { id: 'git_dirty', label: 'dirty marker', category: 'git' },
  { id: 'git_ahead', label: 'ahead count', category: 'git' },
  { id: 'git_behind', label: 'behind count', category: 'git' },

  // Status & Special
  { id: '?', label: 'exit code', category: 'status' },
  { id: 'jobs', label: 'job count', category: 'status' },
  { id: 'hist', label: 'history #', category: 'status' },
  { id: 'cmd', label: 'command #', category: 'status' },
  { id: '$', label: '$ (user)', category: 'status' },
  { id: '#', label: '# (root)', category: 'status' },
  { id: 'prompt', label: '#/$', category: 'status' },

  // Symbols & Separators
  { id: '>', label: '>', category: 'symbols' },
  { id: '<', label: '<', category: 'symbols' },
  { id: '|', label: '|', category: 'symbols' },
  { id: '/', label: '/', category: 'symbols' },
  { id: 'backslash', label: '\\', category: 'symbols' },
  { id: '-', label: '-', category: 'symbols' },
  { id: '_', label: '_', category: 'symbols' },
  { id: '=', label: '=', category: 'symbols' },
  { id: '+', label: '+', category: 'symbols' },
  { id: 'colon', label: ':', category: 'symbols' },
  { id: ';', label: ';', category: 'symbols' },
  { id: 'dot', label: '•', category: 'symbols' },

  // Brackets
  { id: '[', label: '[', category: 'brackets' },
  { id: ']', label: ']', category: 'brackets' },
  { id: '(', label: '(', category: 'brackets' },
  { id: ')', label: ')', category: 'brackets' },
  { id: '{', label: '{', category: 'brackets' },
  { id: '}', label: '}', category: 'brackets' },
  { id: 'langle', label: '⟨', category: 'brackets' },
  { id: 'rangle', label: '⟩', category: 'brackets' },

  // Icons & Visual
  { id: 'check', label: '✔', category: 'icons' },
  { id: 'cross', label: '✖', category: 'icons' },
  { id: 'arrow_r', label: '→', category: 'icons' },
  { id: 'arrow_l', label: '←', category: 'icons' },
  { id: 'lambda', label: 'λ', category: 'icons' },
  { id: 'star', label: '★', category: 'icons' },
  { id: 'heart', label: '♥', category: 'icons' },
  { id: 'lightning', label: '⚡', category: 'icons' },
  { id: 'gear', label: '⚙', category: 'icons' },
  { id: 'lock', label: '🔒', category: 'icons' },

  // Nerd Icons
  { id: 'nf_linux', label: '', category: 'nerd icons' },
  { id: 'nf_arch', label: '', category: 'nerd icons' },
  { id: 'nf_debian', label: '', category: 'nerd icons' },
  { id: 'nf_ubuntu', label: '', category: 'nerd icons' },
  { id: 'nf_apple', label: '', category: 'nerd icons' },
  { id: 'nf_windows', label: '', category: 'nerd icons' },
  { id: 'nf_git', label: '', category: 'nerd icons' },
  { id: 'nf_github', label: '', category: 'nerd icons' },
  { id: 'nf_folder', label: '', category: 'nerd icons' },
  { id: 'nf_home', label: '', category: 'nerd icons' },
  { id: 'nf_term', label: '', category: 'nerd icons' },
  { id: 'nf_shell', label: '', category: 'nerd icons' },
  { id: 'nf_clock', label: '', category: 'nerd icons' },
  { id: 'nf_cal', label: '', category: 'nerd icons' },
  { id: 'nf_python', label: '', category: 'nerd icons' },
  { id: 'nf_node', label: '', category: 'nerd icons' },
  { id: 'nf_js', label: '', category: 'nerd icons' },
  { id: 'nf_ts', label: '', category: 'nerd icons' },
  { id: 'nf_rust', label: '', category: 'nerd icons' },
  { id: 'nf_go', label: '', category: 'nerd icons' },

  // Spacing
  { id: 'space', label: 'space', category: 'spacing' },
  { id: 'newline', label: 'newline', category: 'spacing' },
  { id: 'tab', label: 'tab', category: 'spacing' }
];

function App() {
  return (
    <ThemeProvider>
      <PS1Provider>
        <Router>
          <div className="h-screen bg-graphite-50 dark:bg-graphite-950 text-graphite-800 dark:text-graphite-300 flex flex-col">
            <Header />
            <main className="flex-1 overflow-auto min-h-0 min-w-0 no-scrollbar">
              <Routes>
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/presets" element={<Presets />} />
                <Route path="/" element={
                  <DndProvider>
                    <div className="h-full grid grid-cols-12 gap-px bg-graphite-200 dark:bg-graphite-900 min-h-0 min-w-0">
                      <div className="lg:col-span-3 col-span-3 h-full min-h-0 min-w-0">
                        <DraggableElements elements={elements} />
                      </div>
                      <div className="lg:col-span-6 col-span-6 h-full min-h-0 min-w-0">
                        <VisualEditor />
                      </div>
                      <div className="lg:col-span-3 col-span-3 h-full min-h-0 min-w-0">
                        <CodePreview />
                      </div>
                    </div>
                  </DndProvider>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </PS1Provider>
    </ThemeProvider>
  );
}

export default App;