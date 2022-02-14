import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export function AuthContext({ children }) {
  const [currentUser, setUser] = useState({});
  const [modalIsOpen, setModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGithubProcessing, setIsGithubProcessing] = useState(false);

  const value = {
      currentUser,
      setUser,
      modalIsOpen,
      setModalOpen,
      isProcessing,
      setIsProcessing,
      isGithubProcessing,
      setIsGithubProcessing
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAuth() {
  return useContext(AppContext);
}