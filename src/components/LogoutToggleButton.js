import { Button, DropdownItem } from 'react-bootstrap';
import useUser from '../hooks/UserProvider';

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
