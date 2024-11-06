import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { PS1Element } from '../types';
import { Filter } from 'lucide-react';

interface DraggableElementProps {
  id: string;
  label: string;
}

const DraggableElement = ({ id, label }: DraggableElementProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`px-3 py-2 bg-gray-100 dark:bg-gray-800/50 text-sm rounded-lg cursor-move 
        hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-all duration-200 inline-flex items-center
        border border-gray-200 dark:border-gray-700/50 hover:border-teal-400/50 hover:shadow-lg hover:shadow-teal-400/10
        ${isDragging ? 'ring-2 ring-teal-400 opacity-50' : ''}
        ${label.length <= 2 ? 'w-12 justify-center' : 'w-full'}`}
      style={style}
    >
      {label}
    </button>
  );
};

interface DraggableElementsProps {
  elements: (PS1Element & { category: string })[];
}

const DraggableElements = ({ elements }: DraggableElementsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = ['all', ...new Set(elements.map(el => el.category))];

  const filteredElements = selectedCategory === 'all' 
    ? elements 
    : elements.filter(el => el.category === selectedCategory);

  return (
    <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Elements</h2>
        <div className="relative group">
          <Filter className="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors" />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all
              ${selectedCategory === category
                ? 'bg-teal-400/20 text-teal-400 border border-teal-400/50'
                : 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {filteredElements.map((element) => (
          <DraggableElement key={element.id} {...element} />
        ))}
      </div>
    </div>
  );
};

export default DraggableElements;