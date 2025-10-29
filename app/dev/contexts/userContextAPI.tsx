import { createContext, ReactNode, useEffect, useState } from 'react';
import { loadLoggedInUser, saveLoggedInUser, User } from '../services/user';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  saveUserSession: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
}


export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => { },
  saveUserSession: async () => { },
  logout: async () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const saveUserSession = async (userData: User) => {
    await saveLoggedInUser(userData);
  };

  const logout = async () => {
    setUser(null);
    await saveLoggedInUser(null);
  };

  useEffect(() => {
    const checkUser = async () => {
      const persistedUser = await loadLoggedInUser();

      if (persistedUser) {
        setUser(persistedUser);
      }

    };

    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      saveUserSession,
      logout,
    }}>
      {children}
    </UserContext.Provider>
  );
};

