import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LogoutToggleButton from '../components/LogoutToggleButton';
import Notification from '../components/Notification';
import useUser from '../hooks/UserProvider';
import useQueryParam from '../hooks/useQueryParam';

function Login() {
   const [forbidden] = useQueryParam('forbidden');
   const [notification, setNotification] = useState('');
   const { user, setUser } = useUser();
   const navigate = useNavigate();

   useEffect(() => {
      if (forbidden) {
         setUser(null);
         setNotification('Session abgelaufen. Bitte erneut einloggen!');
      }
   }, [forbidden, setUser]);


   const handleLogin = async () => {
      const username = document.forms['login']['username'].value;
      const password = document.forms['login']['password'].value;

      try {
         const response = await fetch(`${process.env.REACT_APP_APIURL}/users`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ username, password }),
         });

         const { message, userId, token } = await response.json();
         if (response.ok) {
            setUser({ username, userId, token });
            setNotification({
               text: 'Sie haben sich erfolgreich eingeloggt. Sie werden gleich weitergeleitet...',
               type: 'success'
            });
            if (forbidden) navigate(-1);
            else setTimeout(() => navigate('/'), 3000);
         } else {
            setNotification(message ?? 'Login fehlgeschlagen!');
         }
      } catch (error) {
         setNotification('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
      }
   };

   return (
      <Container fluid className="component my-3 justify-content-center">
         <h3>{user ? 'Herzlich willkommen!' : 'Bitte einloggen:'}</h3>
         <Notification notification={notification} />
         <Form name='login' onSubmit={handleLogin}>
            {!user && (
               <>
                  <Form.Group className="my-3">
                     <Form.Label>Benutzername:</Form.Label>
                     <Form.Control type="text" name="username" autoComplete='username' required />
                  </Form.Group>
                  <Form.Group className="my-3">
                     <Form.Label>Passwort:</Form.Label>
                     <Form.Control type="password" name="password" autoComplete='current-password' required />
                  </Form.Group>
               </>
            )}
            <Form.Group className="d-flex justify-content-around">
               <LogoutToggleButton onLogin={handleLogin} setNotification={setNotification} />
               {!user && <Button onClick={() => navigate('/register')}>Registrieren</Button>}
            </Form.Group>
         </Form>
      </Container>
   );
}

export default Login;
