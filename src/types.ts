export interface PS1Element {
  id: string;
  label: string;
  color?: string;
}

export interface PS1ContextType {
  elements: PS1Element[];
  addElement: (element: PS1Element) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, updates: Partial<PS1Element>) => void;
  reorderElements: (oldIndex: number, newIndex: number) => void;
  clearElements: () => void;
}