import React from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Header from './components/Header';
import DraggableElements from './components/DraggableElements';
import VisualEditor from './components/VisualEditor';
import CodePreview from './components/CodePreview';
import Footer from './components/Footer';
import { PS1Provider } from './context/PS1Context';
import { usePS1Context } from './context/PS1Context';
import { ThemeProvider } from './context/ThemeContext';

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
];

function App() {
  return (
    <ThemeProvider>
      <PS1Provider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
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
            </main>
            <Footer />
          </div>
        </div>
      </PS1Provider>
    </ThemeProvider>
  );
}

export default App;