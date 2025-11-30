import React, { useRef } from "react";
import { useDroppable } from "@dnd-kit/core";
import { usePS1Context } from "../context/PS1Context";
import { X, Palette } from "lucide-react";
import ColorPicker from "./ColorPicker";


const VisualEditor = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: "editor",
  });
  const { elements, removeElement, updateElement, clearElements } = usePS1Context();
  const [editingElement, setEditingElement] = React.useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = React.useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

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
        case "nf_linux": content = ""; break;
        case "nf_arch": content = ""; break;
        case "nf_debian": content = ""; break;
        case "nf_ubuntu": content = ""; break;
        case "nf_apple": content = ""; break;
        case "nf_windows": content = ""; break;
        case "nf_git": content = ""; break;
        case "nf_github": content = ""; break;
        case "nf_folder": content = ""; break;
        case "nf_home": content = ""; break;
        case "nf_term": content = ""; break;
        case "nf_shell": content = ""; break;
        case "nf_clock": content = ""; break;
        case "nf_cal": content = ""; break;
        case "nf_python": content = ""; break;
        case "nf_node": content = ""; break;
        case "nf_js": content = ""; break;
        case "nf_ts": content = ""; break;
        case "nf_rust": content = ""; break;
        case "nf_go": content = ""; break;

        // Spacing
        case "space": content = " "; break;
        case "newline": content = "\n"; break;
        case "tab": content = "\t"; break;

        default: content = el.label;
      }
      return (
        <span
          key={index}
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
          <div className="flex flex-wrap gap-1.5 min-w-0">
            {elements.map((element, index) => (
              <div
                key={element.uid ?? `${element.id}-${index}`}
                className="relative group"
              >
                <div
                  className="bg-graphite-200 dark:bg-graphite-900 border border-graphite-400 dark:border-graphite-700 px-2 py-1 flex items-center gap-2 group-hover:border-graphite-500 dark:group-hover:border-graphite-600"
                  style={{
                    borderLeftColor: element.fgColor || '#00ff88',
                    borderLeftWidth: 2,
                  }}
                >
                  <button
                    onClick={() => setEditingElement(element.uid ?? element.id)}
                    className="text-graphite-500 dark:text-graphite-600 hover:text-accent"
                  >
                    <Palette className="w-3 h-3" />
                  </button>
                  <span className="text-xs text-graphite-700 dark:text-graphite-300">
                    {element.label}
                  </span>
                  <button
                    onClick={() => removeElement(element.uid ?? element.id)}
                    className="text-graphite-500 dark:text-graphite-700 hover:text-red-500"
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
            ))}
          </div>
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
