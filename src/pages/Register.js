import { useState } from 'react';
import { Alert, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LogoutToggleButton from '../components/LogoutToggleButton';
import { useUser } from '../components/UserProvider';

function Register() {
   const { user, setUser } = useUser();
   const [ message, setMessage ] = useState('');
   const [ messageType, setMessageType ] = useState('danger');
   const navigate = useNavigate();

   const handleRegistration = async () => {
      const email = document.forms['register']['email'].value;
      const name = document.forms['register']['name'].value;
      const username = document.forms['register']['username'].value;
      const password = document.forms['register']['password'].value;
      const password2 = document.forms['register']['password2'].value;

      if (password !== password2) {
         setMessage('Passwort und Passwort-Bestätigung sind ungleich.');
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
            setMessage('Sie haben sich erfolgreich registriert. Sie werden gleich weitergeleitet...');
            setMessageType('success');
            setTimeout(() => navigate('/'), 2000);
         } else {
            setMessage(message ?? 'Registrierung fehlgeschlagen!');
         }
      } catch (error) {
         console.error('Fehler bei der Registrierung:', error);
         setMessage('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
      }
   };

   return (
      <Container fluid className="component my-3 justify-content-center">
         <h3>{user ? 'Herzlich willkommen!' : 'Bitte alle Felder ausfüllen:'}</h3>
         {message && <Alert className='text-center' variant={messageType}>{message}</Alert>}
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
               <LogoutToggleButton loginText={'Registrieren'} onLogin={handleRegistration} setMessage={setMessage} />
            </Form.Group>
         </Form>
      </Container>
   );
}

export default Register;
