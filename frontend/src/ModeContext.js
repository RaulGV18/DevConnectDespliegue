import React, { createContext, useContext, useState } from 'react';

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  // Comienza en modo "cliente"
  const [mode, setMode] = useState('cliente');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'cliente' ? 'empresa' : 'cliente'));
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);
