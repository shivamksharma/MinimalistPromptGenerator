import React, { createContext, useContext, useState } from 'react';
import type { PS1Element, PS1ContextType } from '../types';

const PS1Context = createContext<PS1ContextType | undefined>(undefined);

export const PS1Provider = ({ children }: { children: React.ReactNode }) => {
  const [elements, setElements] = useState<PS1Element[]>([]);

  const addElement = (element: PS1Element) => {
    setElements((prev) => [...prev, { ...element, color: '#2dd4bf' }]);
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  const updateElement = (id: string, updates: Partial<PS1Element>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
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

  return (
    <PS1Context.Provider value={{ elements, addElement, removeElement, updateElement, reorderElements }}>
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