import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import AddressList from '../components/AddressList';
import Notification from '../components/Notification';
import useAddresses from '../hooks/useAddresses';
import useFetch from '../hooks/useFetch';
import useUser from '../hooks/UserProvider';
import AddressForm from '../components/AddressForm';

export default function Address({ setVisible }) {
   const { error, fetchUrl, loading, result } = useFetch();
   const { user } = useUser();
   const { addresses, error: errorAddresses, loading: loadingAddresses, setAddresses, reload } = useAddresses();
   const [address, setAddress] = useState(null);
   const [notification, setNotification] = useState('');
   const formDefaults = { name: '', street: '', city: '', state: '', postal: '', country: 'Deutschland', isDefault: 0 };

   useEffect(() => {
      if (!user && typeof setVisible === 'function') setVisible(false);
   }, [addresses, setVisible, user]);

   useEffect(() => {
      if (result?.addressId && address) {
         setAddresses((prev) => [...prev, { ...address, id: result.addessId }]);
         setAddress(null);
      }
      else if (result?.success === 1 && address) {
         setAddress(null);
      }
      else if (result?.success === 1) reload();
   }, [result, setAddress, setAddresses]);

   useEffect(() => {
      if (errorAddresses) setNotification(errorAddresses.message ?? 'Abrufen der Adressen fehlgeschlagen. Bitte erneut versuchen.');
      else if (error) setNotification(error.message ?? 'Kommunikation mit dem Server fehlgeschlagen. Bitte erneut versuchen.')
   }, [error, errorAddresses, setNotification]);

   const handleSaveAddress = (e, formData) => {
      e.preventDefault();
      if (formData) fetchUrl('address', formData.id ? 'PUT' : 'POST', formData);
      else setAddress(null);
   };

   const handleToggle = ({ id }) => {
      const toggleAddress = addresses.find(a => a.id === id);
      if (toggleAddress) fetchUrl('address', 'PUT', { id, isDefault: toggleAddress.isDefault === 1 ? 0 : 1 })
   }

   return (
      <>
         <Notification notification={notification} /> 
         <Container fluid='md' className='component justify-content-center'>
            <AddressList addresses={addresses} setEdit={a => setAddress(a)}
            toggleDefault={a => handleToggle(a)} />
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
