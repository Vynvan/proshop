import { useState, useEffect } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddressForm, { formDefaults } from '../components/AddressForm';
import AddressList from '../components/AddressList';
import Notification from '../components/Notification';
import useAddresses from '../hooks/useAddresses';
import useFetch from '../hooks/useFetch';
import useQueryParam from '../hooks/useQueryParam';

/**
 * A component that manages the display and editing of user addresses.
 * It allows users to add, edit, and toggle default addresses.
 *
 * @returns {JSX.Element} The rendered component.
 */
function Address() {
   const { error, fetchUrl, loading, result } = useFetch();
   const { addresses, error: errorAddresses, loading: loadingAddresses, setAddresses, reload } = useAddresses();
   const [address, setAddress] = useState(null);
   const [notification, setNotification] = useState('');
   const [from] = useQueryParam('from');
   const navigate = useNavigate();

   useEffect(() => {
      if (from === 'neworder') setAddress({ ...formDefaults });
   }, [from]);

   useEffect(() => {
      if (address) {
         if (result?.addressId) {
            setAddresses((prev) => [...prev, { ...address, id: result.addessId }]);
            setAddress(null);
            if (from === 'neworder') navigate('/neworder');
         }
         else if (result?.success === 1) {
            if (address.id) reload();
            setAddress(null);
         }
      }
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

   // Display a loading spinner while addresses are being fetched
   if (loadingAddresses) return (
      <Container fluid="md" className="my-3 d-flex">
         <Spinner className="mx-auto" animation="border" variant="primary" />
      </Container>
   );

   return (
      <>
         <Notification notification={notification} />
         <Container fluid='md' className='address component justify-content-center'>
            <AddressList addresses={addresses} setEdit={a => setAddress(a)}
            toggleDefault={a => handleToggle(a)} />
            {address ? (
               <AddressForm address={address} saveAddress={(e, a) => handleSaveAddress(e, a)} />
            ) : (
               <div className='d-flex justify-content-around position-relative'>
                  {loading && <Spinner animation="border" variant="primary" />}
                  <Button onClick={() => setAddress({ ...formDefaults })}>Adresse hinzufügen</Button>
               </div>
            )}
         </Container>
      </>
   );
}

export default Address;
