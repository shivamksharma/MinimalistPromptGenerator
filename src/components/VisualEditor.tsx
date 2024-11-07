import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { usePS1Context } from '../context/PS1Context';
import { X, GripHorizontal, Trash2, Palette } from 'lucide-react';
import ColorPicker from './ColorPicker';

const VisualEditor = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'editor',
  });
  const { elements, removeElement, updateElement, clearElements } = usePS1Context();
  const [editingElement, setEditingElement] = React.useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = React.useState(false);

  const handleClearAll = () => {
    setShowClearConfirm(true);
  };

  const confirmClear = () => {
    clearElements();
    setShowClearConfirm(false);
  };

  const renderPreview = () => {
    if (elements.length === 0) {
      return 'user@hostname:/path/to/directory$ ';
    }

    return elements.map((el, index) => {
      let content = '';
      switch (el.id) {
        case 'u': content = 'user'; break;
        case 'h': content = 'hostname'; break;
        case 'H': content = 'hostname.local'; break;
        case 'w': content = '/path/to/directory'; break;
        case 'W': content = 'directory'; break;
        case '@': content = '@'; break;
        case '$': content = '$'; break;
        case 'space': content = ' '; break;
        case 'time': content = '14:30'; break;
        case 'T': content = '14:30:45'; break;
        case 't': content = '02:30:45 PM'; break;
        case 'd': content = 'Mon Jan 01'; break;
        default: content = el.label;
      }
      return (
        <span 
          key={index} 
          style={{ 
            color: el.fgColor,
            backgroundColor: el.bgColor,
            fontWeight: el.isBold ? 'bold' : 'normal'
          }}
        >
          {content}
        </span>
      );
    });
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Visual Editor</h2>
        {elements.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 
              bg-red-500/10 text-red-500 border border-red-500/20
              hover:bg-red-500/20 hover:border-red-500/30 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>
      <div
        ref={setNodeRef}
        className={`min-h-[200px] bg-gray-100/80 dark:bg-gray-800/50 rounded-xl p-6 border-2 border-dashed transition-all duration-300
          ${isOver ? 'border-teal-400/50 bg-gray-200/80 dark:bg-gray-700/30 shadow-lg shadow-teal-400/10' : 'border-gray-300 dark:border-gray-700/50'}`}
      >
        {elements.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <p className="mb-2">Drag elements here to build your prompt</p>
              <p className="text-sm opacity-75">Elements will appear in the order you add them</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {elements.map((element, index) => (
              <div
                key={`${element.id}-${index}`}
                className="relative group animate-fadeIn"
              >
                <div
                  className="bg-white/80 dark:bg-gray-700/50 px-4 py-2 rounded-lg flex items-center gap-3 group-hover:bg-gray-50 dark:group-hover:bg-gray-700 transition-all
                    border border-gray-200 dark:border-gray-600/50 group-hover:border-teal-400/50"
                  style={{ 
                    borderLeftColor: element.fgColor, 
                    borderLeftWidth: 3,
                    backgroundColor: element.bgColor,
                  }}
                >
                  <GripHorizontal className="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-move" />
                  <button
                    onClick={() => setEditingElement(element.id)}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Palette className="w-4 h-4 text-gray-500 hover:text-teal-400" />
                  </button>
                  <span style={{ 
                    color: element.fgColor,
                    fontWeight: element.isBold ? 'bold' : 'normal'
                  }}>
                    {element.label}
                  </span>
                  <button
                    onClick={() => removeElement(element.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                  >
                    <X className="w-4 h-4 hover:text-red-400" />
                  </button>
                </div>
                {editingElement === element.id && (
                  <ColorPicker
                    element={element}
                    onUpdate={(updates) => updateElement(element.id, updates)}
                    onClose={() => setEditingElement(null)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Preview</h3>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm border border-gray-200 dark:border-gray-800">
          {renderPreview()}
        </div>
      </div>

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Clear All Elements?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This will remove all elements from your prompt. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium
                  bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                  hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmClear}
                className="px-4 py-2 rounded-lg text-sm font-medium
                  bg-red-500 text-white
                  hover:bg-red-600 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualEditor;