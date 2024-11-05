import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { PS1Element } from '../types';

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
      className={`px-3 py-1.5 bg-gray-800 text-sm rounded-md cursor-move 
        hover:bg-gray-700 transition-colors inline-flex items-center
        ${isDragging ? 'ring-2 ring-teal-400 opacity-50' : ''}
        ${label.length <= 2 ? 'w-10 justify-center' : ''}`}
      style={style}
    >
      {label}
    </button>
  );
};

interface DraggableElementsProps {
  elements: PS1Element[];
}

const DraggableElements = ({ elements }: DraggableElementsProps) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Available Elements</h2>
      <div className="flex flex-wrap gap-2">
        {elements.map((element) => (
          <DraggableElement key={element.id} {...element} />
        ))}
      </div>
    </div>
  );
};

export default DraggableElements;