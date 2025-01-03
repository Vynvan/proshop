import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LogoutToggleButton from '../components/LogoutToggleButton';
import Notification from '../components/Notification';
import useUser from '../hooks/UserProvider';

/**
 * Register component for user registration.
 * This component allows new users to register by filling out a form with their  username, name, email, and password.
 * It handles form submission and displays notifications based on the registration status.
 *
 * @returns {JSX.Element} The rendered Register component.
 */
function Register() {
   const { user, setUser } = useUser();
   const [ notification, setNotification ] = useState('');
   const navigate = useNavigate();

   /**
    * Handles user registration.
    *
    * This function retrieves the values from the registration form, validates  the password confirmation, 
    * and sends a POST request to the server to register the user. 
    * It updates the notification state based on the response from the server.
    *
    * @async
    * @function handleRegistration
    * @returns {Promise<void>} A promise that resolves when the registration process is complete.
    */
   const handleRegistration = async () => {
      const email = document.forms['register']['email'].value;
      const name = document.forms['register']['name'].value;
      const username = document.forms['register']['username'].value;
      const password = document.forms['register']['password'].value;
      const password2 = document.forms['register']['password2'].value;

      if (password !== password2) {
         setNotification('Passwort und Passwort-Bestätigung sind ungleich.');
         return;
      }

      try {
         const response = await fetch(`${process.env.REACT_APP_APIURL}/users/register`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ username, name, email, password }),
         });

         const { message, userId, token } = await response.json();
         if (response.ok) {
            setUser({ username, userId, token });
            setNotification({
               text: 'Sie haben sich erfolgreich registriert. Sie werden gleich weitergeleitet...',
               type: 'success'
            });
            setTimeout(() => navigate('/'), 3000);
         } else {
            setNotification(message ?? 'Registrierung fehlgeschlagen!');
         }
      } catch (error) {
         setNotification('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
      }
   };

   return (
      <>
         <Notification notification={notification} />
         <Container fluid className="component my-3 justify-content-center">
            <h3>{user ? 'Herzlich willkommen!' : 'Bitte alle Felder ausfüllen:'}</h3>
            <Form name='register'>
               {!user && (
                  <>
                     <Form.Group className="my-3">
                        <Form.Label>Benutzername:</Form.Label>
                        <Form.Control type="text" name="username" autoComplete='username' required />
                     </Form.Group>
                     <Form.Group className="my-3">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" name="name" autoComplete='name' required />
                     </Form.Group>
                     <Form.Group className="my-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" name="email" autoComplete='email' required />
                     </Form.Group>
                     <Form.Group className="my-3">
                        <Form.Label>Passwort:</Form.Label>
                        <Form.Control type="password" name="password" autoComplete='current-password' required />
                     </Form.Group>
                     <Form.Group className="my-3">
                        <Form.Label>Passwort bestätigen:</Form.Label>
                        <Form.Control type="password" name="password2" required />
                     </Form.Group>
                  </>
               )}
               <Form.Group className="d-flex justify-content-around">
                  <LogoutToggleButton loginText={'Registrieren'} onLogin={handleRegistration} setNotification={setNotification} />
               </Form.Group>
            </Form>
         </Container>
      </>
   );
}

export default Register;
