import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AuthContext({ children }) {
  const value = {
      name: "steven"
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