import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import AddressList from '../components/AddressList';
import Notification from '../components/Notification';
import useUser from '../hooks/UserProvider';
import useFetch from '../hooks/useFetch';
import AddressForm from '../components/AddressForm';

export default function Address({ setVisible }) {
   const { error, fetchUrl, loading, result } = useFetch();
   const { user } = useUser();
   const [address, setAddress] = useState(null);
   const [addresses, setAddresses] = useState([]);
   const [notification, setNotification] = useState('');
   const formDefaults = { name: '', street: '', city: '', state: '', postal: '', country: 'Deutschland', isDefault: false };

   useEffect(() => {
      if (!user && typeof setVisible === 'function') setVisible(false);
      if (user) fetchUrl('address');
   }, [fetchUrl, setVisible, user]);

   useEffect(() => {
      if (result?.addresses) setAddresses(result.addresses);
      else if (result?.addressId && address) {
         const newAddress = { ...address, id: result.addessId };
         setAddresses((prev) => [...prev, newAddress]);
         setAddress(null);
      }
      else if (result?.affectedRows === 1 && address) {
         setAddress(null);
      }
   }, [result, setAddress, setAddresses]);

   useEffect(() => {
      if (error) setNotification(error.message ?? 'Abrufen der Adressen fehlgeschlagen.');
   }, [error, setNotification]);

   const handleSaveAddress = (e, formData) => {
      e.preventDefault();
      if (formData) fetchUrl('address', formData.id ? 'PUT' : 'POST', formData);
      else setAddress(null);
   };

   return (
      <>
         <Notification notification={notification} /> 
         <Container fluid='md' className='component justify-content-center'>
            <AddressList addresses={addresses} setEdit={a => setAddress(a)} toggleDefault={a => fetchUrl('address', 'PUT', { id: a.id, isDefault: !a.isDefault })} />
            {address ? (
               <AddressForm addressToEdit={address} formDefaults={formDefaults} saveAddress={(e, a) => handleSaveAddress(e, a)} />
            ) : (
               <div className='d-flex justify-content-around'>
                  <Button onClick={() => setAddress({ ...formDefaults })}>Adresse hinzufügen</Button>
               </div>
            )}
         </Container>
      </>
   );
}
