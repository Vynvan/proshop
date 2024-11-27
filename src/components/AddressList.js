import { useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import AddressDisplay from './AddressDisplay';

/**
 * A component that displays a list of addresses in an accordion format.
 * Users can view details of each address, edit addresses, and set a default address.
 *
 * @category Components
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.addresses - An array of address objects to be displayed.
 * @param {Function} props.setEdit - A function to set the address for editing.
 * @param {Function} props.toggleDefault - A function to toggle the default status of an address.
 * @returns {JSX.Element} The rendered component.
 */
export default function AddressList({ addresses, setEdit, toggleDefault }) {
   const [activeKey, setActiveKey] = useState(null);

   if (!addresses || addresses.length === 0) return (
      <div className='my-3 container-fluid d-flex flex-column'>
         <p className='mb-3 mx-auto'>Sie haben noch keine Lieferadresse gespeichert.</p>
      </div>
   );

   return (
      <Accordion activeKey={activeKey} className='mb-3'>
         {addresses.map(address => (
            <Accordion.Item className="address-item" eventKey={address.id} key={address.id}>
               <Card className="flex-row align-items-center border-0 flex-0-0 m-0 pointer" 
               onClick={() => setActiveKey(activeKey === address.id ? null : address.id)}>
                  <span className="title flex-grow-1 px-3">
                     {address.name}
                  </span>
                  {address.isDefault === 1 && <span>(bevorzugt)</span>}
                  <Accordion.Button onClick={() => setActiveKey(activeKey === address.id ? null : address.id)}>Details&nbsp;</Accordion.Button>
               </Card>
               <Accordion.Body className="p-3">
                  <AddressDisplay address={address} />
                  <div className='d-flex justify-content-around'>
                     {address.isDefault === 0 && <Button onClick={() => toggleDefault ? toggleDefault({ id: activeKey }) : null}>Bevorzugen</Button>}
                     <Button onClick={() => setEdit ? setEdit(address): null}>Bearbeiten</Button>
                  </div>
               </Accordion.Body>
            </Accordion.Item>
         ))}
      </Accordion>
   );
}
