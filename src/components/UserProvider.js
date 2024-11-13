import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
   const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

   useEffect(() => {
      if (user) localStorage.setItem('user', JSON.stringify(user));
      else localStorage.removeItem('user');
   }, [user]);

   return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export function useUser () {
   return useContext(UserContext);
 };