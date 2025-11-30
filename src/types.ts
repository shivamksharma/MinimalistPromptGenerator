export interface PS1Element {
  id: string;
  label: string;
  uid?: string;
  fgColor?: string;
  bgColor?: string;
  isBold?: boolean;
}

export interface PS1ContextType {
  elements: PS1Element[];
  addElement: (element: PS1Element) => void;
  removeElement: (uid: string) => void;
  updateElement: (uid: string, updates: Partial<PS1Element>) => void;
  reorderElements: (oldIndex: number, newIndex: number) => void;
  clearElements: () => void;
  loadPreset: (elements: PS1Element[]) => void;
}