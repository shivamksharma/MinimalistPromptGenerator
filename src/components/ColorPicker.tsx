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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-graphite-100 dark:bg-graphite-950 border border-graphite-400 dark:border-graphite-700 p-4 max-w-sm w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-graphite-300 dark:border-graphite-800">
          <h3 className="text-xs uppercase tracking-wider text-graphite-600 dark:text-graphite-400">Style: {element.label}</h3>
          <button onClick={onClose}>
            <X className="w-3.5 h-3.5 text-graphite-500 dark:text-graphite-600 hover:text-graphite-700 dark:hover:text-graphite-400" />
          </button>
        </div>

        <div className="flex gap-1.5 mb-3">
          <button
            onClick={() => setActiveTab('fg')}
            className={`flex-1 px-3 py-1.5 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wide border
              ${activeTab === 'fg' 
                ? 'bg-accent/10 text-accent border-accent' 
                : 'bg-transparent text-graphite-600 dark:text-graphite-500 border-graphite-400 dark:border-graphite-700 hover:border-graphite-500 dark:hover:border-graphite-600'}`}
          >
            <Type className="w-3 h-3" />
            Foreground
          </button>
          <button
            onClick={() => setActiveTab('bg')}
            className={`flex-1 px-3 py-1.5 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wide border
              ${activeTab === 'bg'
                ? 'bg-accent/10 text-accent border-accent'
                : 'bg-transparent text-graphite-600 dark:text-graphite-500 border-graphite-400 dark:border-graphite-700 hover:border-graphite-500 dark:hover:border-graphite-600'}`}
          >
            <Square className="w-3 h-3" />
            Background
          </button>
        </div>

        <div className="mb-4">
          <HexColorPicker
            color={activeTab === 'fg' ? element.fgColor : element.bgColor}
            onChange={(color) => onUpdate(activeTab === 'fg' ? { fgColor: color } : { bgColor: color })}
          />
        </div>

        <div className="flex items-center justify-between gap-2 mb-3">
          <button
            onClick={() => onUpdate({ isBold: !element.isBold })}
            className={`px-3 py-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wide border
              ${element.isBold
                ? 'bg-accent/10 text-accent border-accent'
                : 'bg-transparent text-graphite-600 dark:text-graphite-500 border-graphite-400 dark:border-graphite-700 hover:border-graphite-500 dark:hover:border-graphite-600'}`}
          >
            <Bold className="w-3 h-3" />
            Bold
          </button>

          <button
            onClick={() => onUpdate({ 
              fgColor: undefined, 
              bgColor: undefined, 
              isBold: false 
            })}
            className="px-3 py-1.5 text-[10px] uppercase tracking-wide border border-graphite-400 dark:border-graphite-700 text-graphite-600 dark:text-graphite-500 hover:border-graphite-500 dark:hover:border-graphite-600"
          >
            Reset
          </button>
        </div>

        <div className="p-3 bg-graphite-200 dark:bg-graphite-900 border border-graphite-400 dark:border-graphite-800">
          <p className="text-xs" style={{
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