import { createContext, useContext, useEffect, useState } from 'react';

/**
 * @module Hooks
 */

/**
 * A context for managing user data. Private (not exported)!
 * @type {React.Context}
 */
const UserContext = createContext();

/**
 * Provider component that manages user state and provides it to components in the application via context.
 * This component stores the user information in local storage and updates it whenever the user state changes.
 * It also provides a logout function to clear the user state and make a logout request to the server.
 * 
 * @param {Object} props - The props for the provider component.
 * @param {React.ReactNode} props.children - The child components that will have access to the user context.
 * @returns {JSX.Element} The UserContext.Provider component.
 */
export function UserProvider({ children }) {
   const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

   useEffect(() => {
      if (user) localStorage.setItem('user', JSON.stringify(user));
      else localStorage.removeItem('user');
   }, [user]);

   /**
    * This function sends a POST request to the server to log out the user and then clears the user state.
    * DROPPED FEATURE: This was implemented to save a "lastLogin" state for the user. This never happened.
    */
   const logout = () => {
      fetch(`${process.env.REACT_APP_APIURL}/users/logout`, {
         headers: {  'Content-Type': 'application/json' },
         method: 'POST',
         body: JSON.stringify({ userId: user.userId }),
      });
   
      setUser(null);
   }

   return <UserContext.Provider value={{ logout, user, setUser }}>{children}</UserContext.Provider>;
};

/**
 * Access to the User Context via hook.
 * 
 * @returns {React.Context} A hook to use everything the UserProvider offers.
 */
function useUser () {
   return useContext(UserContext);
};

export default useUser;
