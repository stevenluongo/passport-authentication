import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export function AuthContext({ children }) {
  const [currentUser, setUser] = useState({});
  const value = {
      name: "steven",
      currentUser,
      setUser
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