import React from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Header from './components/Header';
import DraggableElements from './components/DraggableElements';
import VisualEditor from './components/VisualEditor';
import CodePreview from './components/CodePreview';
import { PS1Provider } from './context/PS1Context';
import { usePS1Context } from './context/PS1Context';

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
  // Host information
  { id: 'h', label: 'hostname (short)' },
  { id: 'H', label: 'hostname (full)' },
  { id: 'u', label: 'username' },
  { id: 's', label: 'shell name' },
  { id: 'l', label: 'terminal' },
  { id: 'w', label: 'directory' },
  { id: 'W', label: 'directory (basename)' },
  
  // Time elements
  { id: 'A', label: 'time-short (HH:MM)' },
  { id: 'T', label: 'time with seconds (HH:MM:SS)' },
  { id: 'time', label: 'time (HH:MM)' }, // Changed from '@' to 'time'
  { id: 't', label: 'time with seconds 12 hours (HH:MM:SS)' },
  { id: 'd', label: 'date (Day Month Date)' },
  
  // Status and special characters
  { id: '$', label: 'exit status' },
  { id: '>', label: '>' },
  { id: '@', label: '@' },
  { id: '[', label: '[' },
  { id: ']', label: ']' },
  { id: '(', label: '(' },
  { id: ')', label: ')' },
  { id: '{', label: '{' },
  { id: '}', label: '}' },
  { id: '|', label: '|' },
  { id: 'backslash', label: '\\' }, // Changed from '\' to 'backslash'
  { id: '-', label: '-' },
  
  // Special elements
  { id: 'space', label: 'space' }, // Changed from ' ' to 'space'
  { id: 'newline', label: 'new line' }, // Changed from '\n' to 'newline'
  { id: 'prompt', label: '#/$' }, // Changed from '#' to 'prompt'
  { id: 'git_branch', label: 'git branch' }, // Changed from '__git_branch__' to 'git_branch'
];

function App() {
  return (
    <PS1Provider>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <DndProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <DraggableElements elements={elements} />
              <VisualEditor />
              <CodePreview />
            </div>
          </DndProvider>
        </main>
      </div>
    </PS1Provider>
  );
}

export default App;