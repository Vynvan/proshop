import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
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

   const handleNewAddress = () => {
      setAddress({});
   };

   const handleEditAddress = (toEdit) => {
      setAddress(toEdit);
   };

   const handleSaveAddress = (e, formData) => {
      e.preventDefault();
      console.log('Address Saving:', formData)
      fetchUrl('address', formData.id ? 'PUT' : 'POST', formData);
   };

   return (
      <>
         <Notification notification={notification} /> 
         <Container fluid className="component my-3 justify-content-center">
            <AddressList addresses={addresses} setNew={() => handleNewAddress()} setEdit={(a) => handleEditAddress(a)} />
            {address && <AddressForm saveAddress={(e, a) => handleSaveAddress(e, a)} />}
         </Container>
      </>
   );
}
