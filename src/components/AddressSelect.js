import { useEffect, useMemo, useState } from "react";
import { Container, FormSelect, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddressDisplay from "./AddressDisplay";
import useAddresses from "../hooks/useAddresses";

/**
 * A component that allows users to select an address from a list.
 * It displays a dropdown of addresses and shows the selected address details.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.setAddress - A function to set the selected address.
 * @returns {JSX.Element} The rendered component.
 */
export default function AddressSelect({ setAddress }) {
   const { addresses, error, loading } = useAddresses();
   const [selected, setSelected] = useState(null);
   const defaultAddress = useMemo(() => addresses ? addresses.find(address => address.isDefault) : null, [addresses]);

   useEffect(() => {
      if (selected) setAddress(selected);
      else if (defaultAddress) {
         setSelected(defaultAddress);
      }
      else setSelected(addresses[0]);
   }, [addresses, defaultAddress, selected, setAddress]);

   const handleChange = (addressId) => setSelected(addresses.find(address => address.id === parseInt(addressId)));

   // Display an error message if addresses could not be loaded
   if (error) return (
      <Container fluid="md" className="my-3 d-flex">
         <p className="mb-3 mx-auto">Adressen konnten nicht geladen werden. Bitte versuchen Sie es erneut.</p>
      </Container>
   );

   // Display a loading spinner while addresses are being fetched
   if (loading) return (
      <Container fluid="md" className="my-3 d-flex">
         <Spinner className="mx-auto" animation="border" variant="primary" />
      </Container>
   );

   // Display a message if there are no addresses available
   if (addresses?.length === 0) return (
      <Container fluid="md" className="my-3 d-flex">
         <p>Sie haben noch keine Lieferadresse bei uns hinterlegt: <Link to={"/address?from=neworder"}>Adresse hinzufügen</Link></p>
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
