import React, { createContext, useContext } from 'react';
import { AuthService } from '../services/authService';
import { UserService } from '../services/userService';

const authService = new AuthService();
const userService = new UserService();

interface UserInterface {
  username: string;
  emailAddress?: string;
  createdAt: Date;
  githubId?: string;
}

interface AppContextInterface {
  user: UserInterface | null;
  setUser: any;
  modalOpen: boolean;
  setModalOpen: any;
  authService: any;
  userService: any;
}

const AppContext = createContext<AppContextInterface | null>(null);

export function GlobalContext({ children }) {
  const [user, setUser] = React.useState<UserInterface | null>(null);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    loadContext();
  }, []);

  const loadContext = async () => {
    const { user } = await authService.fetchSession();
    setUser(user);
    setLoaded(true);
  };

  //passed values for state context
  const value: AppContextInterface = {
    user,
    setUser,
    modalOpen,
    setModalOpen,
    authService,
    userService,
  };

  if (!loaded) return null;

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useGlobalContext() {
  return useContext(AppContext);
}
