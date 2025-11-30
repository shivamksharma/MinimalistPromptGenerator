import React, { createContext, useContext, useState } from 'react';
import type { PS1Element, PS1ContextType } from '../types';

const PS1Context = createContext<PS1ContextType | undefined>(undefined);

export const PS1Provider = ({ children }: { children: React.ReactNode }) => {
  const [elements, setElements] = useState<PS1Element[]>([]);

  const addElement = (element: PS1Element) => {
    // Assign a unique uid to each instance so we can manage duplicates separately
    const uid = (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
      ? (crypto as any).randomUUID()
      : `${element.id}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    setElements((prev) => [...prev, {
      ...element,
      uid,
      fgColor: '#2dd4bf',
      bgColor: undefined,
      isBold: false
    }]);
  };

  const removeElement = (uid: string) => {
    setElements((prev) => prev.filter((el) => el.uid !== uid));
  };

  const updateElement = (uid: string, updates: Partial<PS1Element>) => {
    setElements((prev) =>
      prev.map((el) => (el.uid === uid ? { ...el, ...updates } : el))
    );
  };

  const reorderElements = (oldIndex: number, newIndex: number) => {
    setElements((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(oldIndex, 1);
      result.splice(newIndex, 0, removed);
      return result;
    });
  };

  const clearElements = () => {
    setElements([]);
  };

  const loadPreset = (presetElements: PS1Element[]) => {
    // Ensure each loaded element has a unique uid so they can be managed independently
    const mapped = presetElements.map((el) => {
      const uid = (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
        ? (crypto as any).randomUUID()
        : `${el.id}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      return { ...el, uid } as PS1Element;
    });
    setElements(mapped);
  };

  return (
    <PS1Context.Provider value={{
      elements,
      addElement,
      removeElement,
      updateElement,
      reorderElements,
      clearElements,
      loadPreset
    }}>
      {children}
    </PS1Context.Provider>
  );
};

export const usePS1Context = () => {
  const context = useContext(PS1Context);
  if (context === undefined) {
    throw new Error('usePS1Context must be used within a PS1Provider');
  }
  return context;
};