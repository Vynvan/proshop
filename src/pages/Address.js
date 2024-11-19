import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import AddressList from '../components/AddressList';
import Notification from '../components/Notification';
import useUser from '../hooks/UserProvider';

export default function Address({ setVisible }) {
   const { user } = useUser();
   const [formData, setFormData] = useState({ name: '', street: '', city: '', state: '', postal: '', country: 'Deutschland', defaultAddress: false });
   const [notification, setNotification] = useState('');

   useEffect(() => {
      if (!user && typeof setVisible === 'function') setVisible(false);

      if (user) {
         const fetchAddresses = async () => {
            try {
               const response = await fetch(process.evn.REACT_APP_APIURL + '/address', {
                  method: 'GET',
                  headers: {
                     Authorization: `Bearer ${user.token}`,
                     'Content-Type': 'application/json',
                  }
               });
               console.log(response);
            } catch(error) {
               setNotification(error.message ?? 'Abrufen der Adressen fehlgeschlagen.');
            }
         }
         fetchAddresses();
      }
   }, [setVisible, user]);

   const handleInputChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
   };

   const handleSaveAddress = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch(process.evn.REACT_APP_APIURL + '/address', {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${user.token}`,
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
         });
         const { errorType, message } = await response.json();
         if (!response.ok) {
            if (errorType === 'token') {
               setNotification('Redirect...')
            } else {
               setNotification(message ?? 'Fehler beim Laden des Profils.');
            }
         }
         else {
            setNotification({
               text: 'Daten erfolgreich gespeichert.',
               type: 'success'
            });
         }
      } catch (error) {
         console.log(error);
         setNotification('Fehler beim Speichern der Adresse.');
      }
   };

   return (
      <>
         <Notification notification={notification} />
      <Container fluid className="component my-3 justify-content-center">
         <AddressList />
         <h3>Adresse bearbeiten</h3>
         <Form onSubmit={(e) => handleSaveAddress(e)}>
            <Form.Group className="my-3">
               <Form.Label>Bezeichnung (zB. Hauptadresse):</Form.Label>
               <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Bezeichnung eingeben"
                  required
               />
            </Form.Group>
            <Form.Group className="my-3">
               <Form.Label>Straße:</Form.Label>
               <Form.Control
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="Straße eingeben"
                  required
               />
            </Form.Group>
            <Form.Group className="my-3">
               <Form.Label>Stadt:</Form.Label>
               <Form.Control
                  type='text'
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Stadt eingeben"
                  className="form-control"
               />
            </Form.Group>
            <Form.Group className="my-3">
               <Form.Label>Bundesland:</Form.Label>
               <Form.Control
                  type='text'
                  name="state"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Bundesland eingeben"
                  className="form-control"
               />
            </Form.Group>
            <Form.Group className="my-3">
               <Form.Label>Postleitzahl:</Form.Label>
               <Form.Control
                  type='text'
                  name="postal"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Postleitzahl eingeben"
                  className="form-control"
               />
            </Form.Group>
            <Form.Group className="my-3">
               <Form.Label>Land:</Form.Label>
               <Form.Control
                  type='text'
                  name="country"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Land eingeben"
                  className="form-control"
               />
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
               <Button type="submit">Adresse speichern</Button>
            </Form.Group>
         </Form>
      </Container>
      </>
   );
}
