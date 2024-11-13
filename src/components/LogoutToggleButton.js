import { Button, DropdownItem } from 'react-bootstrap';
import { useUser } from './UserProvider';

function LogoutToggleButton({ asDropdownItem, loginText, onLogin, setMessage, setMessageType }) {
   const { user, setUser } = useUser();

   if (!onLogin) onLogin = () => {};
   const handleLogout = async () => {
      fetch(`${process.env.REACT_APP_APIURL}/users/logout`, {
         headers: {  'Content-Type': 'application/json' },
         method: 'POST',
         body: JSON.stringify({ userId: user.userId }),
      });
   
      setUser(null);
      if (setMessage) setMessage('Sie haben sich ausgeloggt. Bis zum nächsten Mal!');
      if (setMessageType) setMessageType('success');
   }
   
   return (
      asDropdownItem ? (
         <DropdownItem onClick={handleLogout}>Abmelden</DropdownItem>
      ) : (
      <Button onClick={() => user ? handleLogout() : onLogin()}>
         {user ? 'Abmelden' : loginText ?? 'Anmelden'}
      </Button>
   ));
}

export default LogoutToggleButton;
