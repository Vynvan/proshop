import { useEffect, useState } from "react";
import { Container, FormSelect } from "react-bootstrap";
import AddressDisplay from "./AddressDisplay";
import useAddresses from "../hooks/useAddresses";

export default function AddressSelect({ setAddress }) {
   const { addresses, error, loading } = useAddresses();
   const [selected, setSelected] = useState(null);
   const defaultAddress = addresses ? addresses.find(address => address.isDefault) : null;

   useEffect(() => {
      if (selected) setAddress(selected);
      else {
         setAddress(defaultAddress);
         setSelected(defaultAddress);
      }
   }, [defaultAddress, selected, setAddress]);

   const handleChange = (addressId) => setSelected(addresses.find(address => address.id == addressId));

   if (error) return (
      <Container fluid="md" className="my-3 d-flex">
         <p className="mb-3 mx-auto">Adressen konnten nicht geladen werden. Bitte versuchen Sie es erneut.</p>
      </Container>
   );

   return (
      <>
         <FormSelect className="mb-3" defaultValue={defaultAddress} onChange={(e) => handleChange(e.target.value)}>
            {addresses && addresses.map(address => (
               <option key={address.id} value={address.id}>{address.name}</option>
            ))}
         </FormSelect>
         <AddressDisplay address={selected} />
      </>
   );
}
