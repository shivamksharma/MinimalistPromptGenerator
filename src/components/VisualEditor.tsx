import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { usePS1Context } from '../context/PS1Context';
import { HexColorPicker } from 'react-colorful';
import { X } from 'lucide-react';

const VisualEditor = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'editor',
  });
  const { elements, removeElement, updateElement } = usePS1Context();
  const [editingColor, setEditingColor] = React.useState<string | null>(null);

  const renderPreview = () => {
    if (elements.length === 0) {
      return 'mario@computer:/usr/local/src$ ';
    }

    return elements.map((el, index) => {
      let content = '';
      switch (el.id) {
        case 'u':
          content = 'mario';
          break;
        case 'h':
          content = 'computer';
          break;
        case 'H':
          content = 'computer.local';
          break;
        case 'w':
          content = '/usr/local/src';
          break;
        case 'W':
          content = 'src';
          break;
        case '@':
          content = '@';
          break;
        case '$':
          content = '$';
          break;
        case 'space':
          content = ' ';
          break;
        case 'time':
          content = '14:30';
          break;
        case 'T':
          content = '14:30:45';
          break;
        case 't':
          content = '02:30:45 PM';
          break;
        case 'd':
          content = 'Mon Jan 01';
          break;
        default:
          content = el.label;
      }
      return (
        <span key={index} style={{ color: el.color }}>
          {content}
        </span>
      );
    });
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Visual Editor</h2>
      <div
        ref={setNodeRef}
        className={`min-h-[200px] bg-gray-800 rounded-lg p-4 border-2 border-dashed transition-colors ${
          isOver ? 'border-teal-400 bg-gray-700/50' : 'border-gray-700'
        }`}
      >
        {elements.length === 0 && (
          <div className="text-gray-500 text-center">
            Drag elements here to build your prompt
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {elements.map((element, index) => (
            <div
              key={`${element.id}-${index}`}
              className="relative group"
            >
              <div
                className="bg-gray-700 px-3 py-1.5 rounded flex items-center gap-2"
                style={{ borderLeftColor: element.color, borderLeftWidth: 3 }}
              >
                <div
                  className="w-3 h-3 rounded-full cursor-pointer"
                  style={{ backgroundColor: element.color }}
                  onClick={() => setEditingColor(element.id)}
                />
                <span>{element.label}</span>
                <button
                  onClick={() => removeElement(element.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 hover:text-red-400" />
                </button>
              </div>
              {editingColor === element.id && (
                <div className="absolute z-10 top-full mt-2">
                  <div className="fixed inset-0" onClick={() => setEditingColor(null)} />
                  <div className="relative">
                    <HexColorPicker
                      color={element.color}
                      onChange={(color) => {
                        updateElement(element.id, { color });
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-400 mb-2">Preview</h3>
        <div className="bg-gray-900 p-4 rounded font-mono text-sm">
          {renderPreview()}
        </div>
      </div>
    </div>
  );
};

export default VisualEditor;