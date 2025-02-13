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
  { id: 'h', label: 'hostname (short)', category: 'system' },
  { id: 'H', label: 'hostname (full)', category: 'system' },
  { id: 'u', label: 'username', category: 'system' },
  { id: 's', label: 'shell name', category: 'system' },
  { id: 'l', label: 'terminal', category: 'system' },
  { id: 'w', label: 'directory', category: 'path' },
  { id: 'W', label: 'directory (basename)', category: 'path' },
  { id: 'A', label: 'time (HH:MM)', category: 'time' },
  { id: 'T', label: 'time with seconds', category: 'time' },
  { id: 'time', label: 'time (HH:MM)', category: 'time' },
  { id: 't', label: '12-hour time', category: 'time' },
  { id: 'd', label: 'date', category: 'time' },
  { id: '$', label: 'exit status', category: 'special' },
  { id: '>', label: '>', category: 'symbols' },
  { id: '$', label: '$', category: 'symbols' },
  { id: '#', label: '#', category: 'symbols' },
  { id: '/', label: '/', category: 'symbols' },
  { id: '@', label: '@', category: 'symbols' },
  { id: '[', label: '[', category: 'symbols' },
  { id: ']', label: ']', category: 'symbols' },
  { id: '(', label: '(', category: 'symbols' },
  { id: ')', label: ')', category: 'symbols' },
  { id: '{', label: '{', category: 'symbols' },
  { id: '}', label: '}', category: 'symbols' },
  { id: '|', label: '|', category: 'symbols' },
  { id: 'colon', label: ':', category: 'symbols' },
  { id: 'backslash', label: '\\', category: 'symbols' },
  { id: '-', label: '-', category: 'symbols' },
  { id: 'space', label: 'space', category: 'special' },
  { id: 'newline', label: 'new line', category: 'special' },
  { id: 'prompt', label: '#/$', category: 'special' },
  { id: 'git_branch', label: 'git branch', category: 'git' },
  { id: 'git_commit', label: 'git commit hash', category: 'git' },
  { id: 'git_status', label: 'git status', category: 'git' },
  { id: 'os', label: 'OS name', category: 'system' },
  { id: 'check', label: '✔', category: 'symbols' },
  { id: 'cross', label: '✖', category: 'symbols' }
];

function App() {
  return (
    <ThemeProvider>
      <PS1Provider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/documentation" element={<Documentation />} />
                  <Route path="/" element={
                    <DndProvider>
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-3">
                          <DraggableElements elements={elements} />
                        </div>
                        <div className="lg:col-span-6">
                          <VisualEditor />
                        </div>
                        <div className="lg:col-span-3">
                          <CodePreview />
                        </div>
                      </div>
                    </DndProvider>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </Router>
      </PS1Provider>
    </ThemeProvider>
  );
}

export default App;