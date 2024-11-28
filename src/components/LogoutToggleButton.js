/**
 * @module Components
 */

import { Button, DropdownItem } from 'react-bootstrap';
import useUser from '../hooks/UserProvider';

/**
 * LogoutToggleButton component that provides a button or dropdown item for logging out a user.
 * 
 * This component uses the `useUser` hook to access user information and the logout function.
 * It conditionally renders either a Button or a DropdownItem based on the `asDropdownItem` prop.
 * 
 * @component
 * @param {Object} props - The properties for the component.
 * @param {boolean} props.asDropdownItem - If true, renders as a DropdownItem; otherwise, renders as a Button.
 * @param {string} [props.loginText] - The text to display when the user is not logged in.
 * @param {function} [props.onLogin] - Callback function to be called when the user is not logged in.
 * @param {function} [props.setMessage] - Function to set a message after logout.
 * @param {function} [props.setMessageType] - Function to set the message type (e.g., success, error).
 * @param {function} [props.setNotification] - Function to set a notification object after logout.
 * @returns {JSX.Element} The rendered LogoutToggleButton component.
 */
function LogoutToggleButton({ asDropdownItem, loginText, onLogin, setMessage, setMessageType, setNotification }) {
   const { logout, user } = useUser();

   if (!onLogin) onLogin = () => {};

   const handleLogout = () => {
      logout();      
      if (setMessage) setMessage('Sie haben sich ausgeloggt. Bis zum nächsten Mal!');
      if (setMessageType) setMessageType('success');
      if (setNotification) setNotification({
         text: 'Sie haben sich ausgeloggt. Bis zum nächsten Mal!',
         type: 'success'
      });
   }
   
   return (
      asDropdownItem ? (
         <DropdownItem onClick={() => handleLogout()}>Abmelden</DropdownItem>
      ) : (
      <Button onClick={() => user ? handleLogout() : onLogin()}>
         {user ? 'Abmelden' : loginText ?? 'Anmelden'}
      </Button>
   ));
}

export default LogoutToggleButton;
