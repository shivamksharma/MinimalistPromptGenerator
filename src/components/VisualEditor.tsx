import React, { useRef, useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { usePS1Context } from "../context/PS1Context";
import { X, Palette, GripVertical } from "lucide-react";
import ColorPicker from "./ColorPicker";
import type { PS1Element } from "../types";

// Sortable element chip component
interface SortableElementProps {
  element: PS1Element;
  index: number;
  editingElement: string | null;
  setEditingElement: (uid: string | null) => void;
  removeElement: (uid: string) => void;
  updateElement: (uid: string, updates: Partial<PS1Element>) => void;
}

const SortableElement: React.FC<SortableElementProps> = ({
  element,
  editingElement,
  setEditingElement,
  removeElement,
  updateElement,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: element.uid!,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 200ms cubic-bezier(0.25, 1, 0.5, 1)",
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? "cursor-grabbing" : ""}`}
    >
      <div
        className={`bg-graphite-200 dark:bg-graphite-900 border border-graphite-400 dark:border-graphite-700 px-2 py-1 flex items-center gap-1.5 group-hover:border-graphite-500 dark:group-hover:border-graphite-600 transition-colors duration-150 ${isDragging ? "shadow-lg ring-2 ring-accent/50" : ""
          }`}
        style={{
          borderLeftColor: element.fgColor || "#00ff88",
          borderLeftWidth: 2,
        }}
      >
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="text-graphite-400 dark:text-graphite-600 hover:text-graphite-600 dark:hover:text-graphite-400 cursor-grab active:cursor-grabbing focus:outline-none focus:ring-1 focus:ring-accent/50 rounded-sm"
          aria-label={`Drag to reorder ${element.label}`}
        >
          <GripVertical className="w-3 h-3" />
        </button>
        <button
          onClick={() => setEditingElement(element.uid ?? element.id)}
          className="text-graphite-500 dark:text-graphite-600 hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent/50 rounded-sm"
          aria-label={`Edit color for ${element.label}`}
        >
          <Palette className="w-3 h-3" />
        </button>
        <span className="text-xs text-graphite-700 dark:text-graphite-300 select-none">
          {element.label}
        </span>
        <button
          onClick={() => removeElement(element.uid ?? element.id)}
          className="text-graphite-500 dark:text-graphite-700 hover:text-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/50 rounded-sm"
          aria-label={`Remove ${element.label}`}
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      {editingElement === (element.uid ?? element.id) && (
        <ColorPicker
          element={element}
          onUpdate={(updates) => updateElement(element.uid ?? element.id, updates)}
          onClose={() => setEditingElement(null)}
        />
      )}
    </div>
  );
};

// Drag overlay element (ghost that follows cursor)
const DragOverlayElement: React.FC<{ element: PS1Element }> = ({ element }) => (
  <div
    className="bg-graphite-200 dark:bg-graphite-900 border border-accent px-2 py-1 flex items-center gap-1.5 shadow-xl cursor-grabbing"
    style={{
      borderLeftColor: element.fgColor || "#00ff88",
      borderLeftWidth: 2,
    }}
  >
    <GripVertical className="w-3 h-3 text-accent" />
    <Palette className="w-3 h-3 text-graphite-500 dark:text-graphite-600" />
    <span className="text-xs text-graphite-700 dark:text-graphite-300 select-none">
      {element.label}
    </span>
    <X className="w-3 h-3 text-graphite-500 dark:text-graphite-700" />
  </div>
);

const VisualEditor = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: "editor",
  });
  const { elements, removeElement, updateElement, clearElements, reorderElements } = usePS1Context();
  const [editingElement, setEditingElement] = React.useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Minimum drag distance before activation
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Memoized element IDs for SortableContext
  const elementIds = useMemo(
    () => elements.map((el) => el.uid!).filter(Boolean),
    [elements]
  );

  // Find active element for drag overlay
  const activeElement = useMemo(
    () => elements.find((el) => el.uid === activeId),
    [elements, activeId]
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    // Close color picker when dragging starts
    setEditingElement(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = elements.findIndex((el) => el.uid === active.id);
      const newIndex = elements.findIndex((el) => el.uid === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderElements(oldIndex, newIndex);
      }
    }
  };

  const handleClearAll = () => {
    setShowClearConfirm(true);
  };

  const confirmClear = () => {
    clearElements();
    setShowClearConfirm(false);
  };

  const renderPreview = () => {
    if (elements.length === 0) {
      return "user@hostname:/path/to/directory$ ";
    }

    return elements.map((el, index) => {
      let content = "";
      switch (el.id) {
        // System
        case "u": content = "user"; break;
        case "h": content = "hostname"; break;
        case "H": content = "hostname.local"; break;
        case "s": content = "bash"; break;
        case "l": content = "tty1"; break;
        case "os": content = "Linux"; break;
        case "v": content = "5.1"; break;
        case "V": content = "5.1.8"; break;

        // Path
        case "w": content = "/home/user/projects"; break;
        case "W": content = "projects"; break;
        case "PWD": content = "/home/user/projects"; break;
        case "~": content = "~"; break;

        // Time
        case "A": content = "14:30"; break;
        case "T": content = "14:30:45"; break;
        case "t": content = "02:30:45"; break;
        case "@": content = "02:30 PM"; break;
        case "d": content = "Sat Nov 30"; break;
        case "D": content = "11/30/25"; break;

        // Git
        case "git_branch": content = "main"; break;
        case "git_commit": content = "a1b2c3d"; break;
        case "git_status": content = "✓"; break;
        case "git_dirty": content = "*"; break;
        case "git_ahead": content = "↑1"; break;
        case "git_behind": content = "↓1"; break;

        // Status
        case "?": content = "0"; break;
        case "jobs": content = "2"; break;
        case "hist": content = "501"; break;
        case "cmd": content = "42"; break;
        case "$": content = "$"; break;
        case "#": content = "#"; break;
        case "prompt": content = "$"; break;

        // Symbols
        case ">": content = ">"; break;
        case "<": content = "<"; break;
        case "|": content = "|"; break;
        case "/": content = "/"; break;
        case "backslash": content = "\\"; break;
        case "-": content = "-"; break;
        case "_": content = "_"; break;
        case "=": content = "="; break;
        case "+": content = "+"; break;
        case "colon": content = ":"; break;
        case ";": content = ";"; break;
        case "dot": content = "•"; break;

        // Brackets
        case "[": content = "["; break;
        case "]": content = "]"; break;
        case "(": content = "("; break;
        case ")": content = ")"; break;
        case "{": content = "{"; break;
        case "}": content = "}"; break;

        // Icons
        case "check": content = "✔"; break;
        case "cross": content = "✖"; break;
        case "arrow_r": content = "→"; break;
        case "arrow_l": content = "←"; break;
        case "lambda": content = "λ"; break;
        case "star": content = "★"; break;
        case "heart": content = "♥"; break;
        case "lightning": content = "⚡"; break;
        case "gear": content = "⚙"; break;
        case "lock": content = "🔒"; break;

        // Nerd Icons
        case "nf_linux": content = ""; break;
        case "nf_arch": content = ""; break;
        case "nf_debian": content = ""; break;
        case "nf_ubuntu": content = ""; break;
        case "nf_apple": content = ""; break;
        case "nf_windows": content = ""; break;
        case "nf_git": content = ""; break;
        case "nf_github": content = ""; break;
        case "nf_folder": content = ""; break;
        case "nf_home": content = ""; break;
        case "nf_term": content = ""; break;
        case "nf_shell": content = ""; break;
        case "nf_clock": content = ""; break;
        case "nf_cal": content = ""; break;
        case "nf_python": content = ""; break;
        case "nf_node": content = ""; break;
        case "nf_js": content = ""; break;
        case "nf_ts": content = ""; break;
        case "nf_rust": content = ""; break;
        case "nf_go": content = ""; break;

        // Spacing
        case "space": content = " "; break;
        case "newline": content = "\n"; break;
        case "tab": content = "\t"; break;

        default: content = el.label;
      }
      return (
        <span
          key={el.uid ?? index}
          style={{
            color: el.fgColor,
            backgroundColor: el.bgColor,
            fontWeight: el.isBold ? "bold" : "normal",
            whiteSpace: el.id === "newline" ? "pre" : "normal",
          }}
        >
          {content}
        </span>
      );
    });
  };

  return (
    <div className="bg-graphite-100 dark:bg-graphite-950 border border-graphite-300 dark:border-graphite-800 h-full flex flex-col min-h-0 min-w-0">
      <div className="px-3 py-2.5 border-b border-graphite-300 dark:border-graphite-800 flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-wider text-graphite-600 dark:text-graphite-400">Visual Editor</h2>
        {elements.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-2 py-0.5 text-[10px] uppercase tracking-wide border border-graphite-400 dark:border-graphite-700 text-graphite-600 dark:text-graphite-500 hover:border-red-500 hover:text-red-500"
          >
            Clear
          </button>
        )}
      </div>
      <div
        ref={(el) => { setNodeRef(el); scrollRef.current = el; }}
        className={`flex-1 p-3 border-b border-graphite-300 dark:border-graphite-800 min-h-0 min-w-0 overflow-y-auto no-scrollbar ${isOver ? "bg-accent/5" : ""}`}
      >
        {elements.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-graphite-500 dark:text-graphite-600 text-xs">
              <p>DROP ELEMENTS HERE</p>
            </div>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={elementIds} strategy={horizontalListSortingStrategy}>
              <div className="flex flex-wrap gap-1.5 min-w-0">
                {elements.map((element, index) => (
                  <SortableElement
                    key={element.uid ?? `${element.id}-${index}`}
                    element={element}
                    index={index}
                    editingElement={editingElement}
                    setEditingElement={setEditingElement}
                    removeElement={removeElement}
                    updateElement={updateElement}
                  />
                ))}
              </div>
            </SortableContext>
            <DragOverlay dropAnimation={{
              duration: 200,
              easing: "cubic-bezier(0.25, 1, 0.5, 1)",
            }}>
              {activeElement ? <DragOverlayElement element={activeElement} /> : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-[10px] uppercase tracking-wider text-graphite-500 dark:text-graphite-600 mb-2">
          Preview
        </h3>
        <div className="bg-graphite-200 dark:bg-graphite-900 border border-graphite-400 dark:border-graphite-800 p-3 text-xs text-graphite-700 dark:text-graphite-300">
          {renderPreview()}
        </div>
      </div>

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-graphite-100 dark:bg-graphite-950 border border-graphite-400 dark:border-graphite-700 p-4 max-w-sm w-full mx-4">
            <h3 className="text-sm text-graphite-700 dark:text-graphite-300 mb-2">Clear All Elements?</h3>
            <p className="text-xs text-graphite-500 dark:text-graphite-600 mb-4">
              This will remove all elements. Cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1 text-xs border border-graphite-400 dark:border-graphite-700 text-graphite-600 dark:text-graphite-400 hover:border-graphite-500 dark:hover:border-graphite-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmClear}
                className="px-3 py-1 text-xs border border-red-500 text-red-500 hover:bg-red-500/10"
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
