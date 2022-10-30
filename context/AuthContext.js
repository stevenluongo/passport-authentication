import { createContext, useContext } from "react";

export const AppContext = createContext();

export function useAuth() {
  return useContext(AppContext);
}
