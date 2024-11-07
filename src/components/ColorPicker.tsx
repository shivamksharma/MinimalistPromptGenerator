import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { X, Type, Square, Bold } from 'lucide-react';

interface ColorPickerProps {
  element: {
    id: string;
    label: string;
    fgColor?: string;
    bgColor?: string;
    isBold?: boolean;
  };
  onUpdate: (updates: Partial<{
    fgColor: string;
    bgColor: string;
    isBold: boolean;
  }>) => void;
  onClose: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ element, onUpdate, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'fg' | 'bg'>('fg');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-sm w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Style "{element.label}"</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 hover:text-red-400 transition-colors" />
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('fg')}
            className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all
              ${activeTab === 'fg' 
                ? 'bg-teal-400/20 text-teal-400 border border-teal-400/50' 
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            <Type className="w-4 h-4" />
            Text Color
          </button>
          <button
            onClick={() => setActiveTab('bg')}
            className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all
              ${activeTab === 'bg'
                ? 'bg-teal-400/20 text-teal-400 border border-teal-400/50'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            <Square className="w-4 h-4" />
            Background
          </button>
        </div>

        <div className="mb-6">
          <HexColorPicker
            color={activeTab === 'fg' ? element.fgColor : element.bgColor}
            onChange={(color) => onUpdate(activeTab === 'fg' ? { fgColor: color } : { bgColor: color })}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => onUpdate({ isBold: !element.isBold })}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all
              ${element.isBold
                ? 'bg-teal-400/20 text-teal-400 border border-teal-400/50'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            <Bold className="w-4 h-4" />
            Bold
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdate({ 
                fgColor: undefined, 
                bgColor: undefined, 
                isBold: false 
              })}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
          <p className="text-sm font-mono" style={{
            color: element.fgColor,
            backgroundColor: element.bgColor,
            fontWeight: element.isBold ? 'bold' : 'normal'
          }}>
            Preview: {element.label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;