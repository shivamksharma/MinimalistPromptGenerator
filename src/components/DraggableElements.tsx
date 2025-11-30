import { useState, useRef } from 'react';
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
    willChange: 'transform',
  } : undefined;

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`px-2 py-1.5 text-xs cursor-move inline-flex items-center justify-center border w-full
        ${isDragging
          ? 'border-accent bg-graphite-200 dark:bg-graphite-800 text-accent opacity-50'
          : 'border-graphite-400 dark:border-graphite-700 bg-graphite-200 dark:bg-graphite-900 text-graphite-700 dark:text-graphite-300 hover:border-accent hover:text-accent'
        }`}
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

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Separate elements by size
  const largeElements = filteredElements.filter(el => el.label.length > 3);
  const smallElements = filteredElements.filter(el => el.label.length <= 3);

  // Calculate how many small elements can fit in the remaining space of large elements
  // Large elements use 2 cols each in a 4-col grid
  // So we need to find how many columns are left in the last row
  const totalColsUsedByLarge = largeElements.length * 2; // each large element uses 2 cols
  const remainingColsInLastRow = totalColsUsedByLarge % 4; // 4 is our grid total
  const availableColsForSmall = remainingColsInLastRow > 0 ? (4 - remainingColsInLastRow) : 0;

  // Each small element uses 1 col, so we can fit that many small elements
  const smallElementsForLargeGrid = smallElements.slice(0, availableColsForSmall);
  const remainingSmallElements = smallElements.slice(availableColsForSmall);

  return (
    <div className="bg-graphite-100 dark:bg-graphite-950 border border-graphite-300 dark:border-graphite-800 h-full flex flex-col min-h-0 min-w-0">
      <div className="px-3 py-2.5 border-b border-graphite-300 dark:border-graphite-800 flex-shrink-0">
        <h2 className="text-xs uppercase tracking-wider text-graphite-600 dark:text-graphite-400">Elements</h2>
      </div>

      <div className="px-3 py-2 border-b border-graphite-300 dark:border-graphite-800 flex flex-wrap gap-1 flex-shrink-0">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-2 py-0.5 text-[10px] uppercase tracking-wide border
              ${selectedCategory === category
                ? 'bg-accent/10 text-accent border-accent'
                : 'bg-transparent text-graphite-600 dark:text-graphite-500 border-graphite-400 dark:border-graphite-700 hover:border-graphite-500 dark:hover:border-graphite-600 hover:text-graphite-800 dark:hover:text-graphite-400'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 min-h-0 min-w-0 no-scrollbar">
        {/* Large Elements Grid (2 columns) with small elements filling last row if needed */}
        {largeElements.length > 0 && (
          <div className="grid grid-cols-4 gap-1.5 min-w-0">
            {largeElements.map((element) => (
              <div key={element.id} className="col-span-2">
                <DraggableElement {...element} />
              </div>
            ))}
            {/* Fill remaining space in last row with small elements */}
            {smallElementsForLargeGrid.map((element) => (
              <div key={element.id} className="col-span-1">
                <DraggableElement {...element} />
              </div>
            ))}
          </div>
        )}

        {/* Remaining Small Elements Grid (4 columns) */}
        {remainingSmallElements.length > 0 && (
          <div className="grid grid-cols-4 gap-1.5 min-w-0 mt-1.5">
            {remainingSmallElements.map((element) => (
              <DraggableElement key={element.id} {...element} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DraggableElements;