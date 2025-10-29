import { createContext, ReactNode, useState } from 'react';
import { User } from '../services/user';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}


export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};