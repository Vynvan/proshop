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
   const { error: postError, fetchUrl: postFetchUrl, result: postResult } = useFetch();
   const { error: putError, fetchUrl: putFetchUrl, result: putResult } = useFetch();
   const { addresses, error: errorAddresses, loading: loadingAddresses, setAddresses, reload } = useAddresses();
   const [address, setAddress] = useState(null);
   const [notification, setNotification] = useState('');
   const [from] = useQueryParam('from');
   const navigate = useNavigate();

   useEffect(() => {
      if (from === 'neworder') setAddress({ ...formDefaults });
   }, [from]);

   useEffect(() => {
      console.log('postResult', postResult, address)
      if (address && postResult?.addressId) {
         const newAddress = { ...address, id: parseInt(postResult.addessId) };
         setAddresses((prev) => [...prev, newAddress]);
         setAddress(null);
         if (from === 'neworder') navigate('/neworder');
      }
   }, [postResult, setAddress, setAddresses]);

   useEffect(() => {
      console.log('putResult', putResult)
      if (address && putResult?.success == 1) {
         setAddress(null);
         reload();
      }
   }, [putResult, setAddress]);

   useEffect(() => {
      if (errorAddresses)
         setNotification(errorAddresses.message ?? 'Abrufen der Adressen fehlgeschlagen. Bitte erneut versuchen.');
      else if (postError)
         setNotification(postError.message ?? 'Kommunikation mit dem Server fehlgeschlagen. Bitte erneut versuchen.');
      else if (putError)
         setNotification(putError.message ?? 'Kommunikation mit dem Server fehlgeschlagen. Bitte erneut versuchen.');
   }, [errorAddresses, postError, putError, setNotification]);

   const handleSaveAddress = (e, formData) => {
      console.log("Saving", formData)
      e.preventDefault();
      if (formData) {
         if (formData.id) putFetchUrl('address', 'PUT', formData);
         else postFetchUrl('address', 'POST', formData);
         setAddress(formData);
      }
      else setAddress(null);
   };

   const handleToggle = ({ id }) => {
      const toggleAddress = addresses.find(a => a.id === id);
      if (toggleAddress) putFetchUrl('address', 'PUT', { id, isDefault: toggleAddress.isDefault === 1 ? 0 : 1 })
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
                  <Button onClick={() => setAddress({ ...formDefaults })}>Adresse hinzufügen</Button>
               </div>
            )}
         </Container>
      </>
   );
}

export default Address;
