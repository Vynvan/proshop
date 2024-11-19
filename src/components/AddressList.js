import { useState } from 'react';
import { Accordion, Card, ToggleButton } from 'react-bootstrap';

export default function AddressList() {
   const [activeKey, setActiveKey] = useState(null);
   const [addresses, setAddresses] = useState([]);
   const noAddresses = addresses?.length > 0;

   const handleDefaultToggles = (e, address) => {
      const checked = e.currentTarget.checked
      console.log(`CHECKED ${address.name} to ${checked}`);
   };

   return (
      <Accordion activeKey={activeKey} className="mx-1 p-md-3 p-2">
         {addresses.map(address => (
            <Accordion.Item className="address-item border-0" eventKey={address.id}>
               <Card className="flex-row align-items-center flex-0-0 m-0">
                  <span className="title flex-grow-1 px-3" onClick={() => setActiveKey(activeKey === address.id ? null : address.id)}>
                     {address.name}
                  </span>
                  {address.isDefault && <span>&lpar;Standard&lpar;</span>}
                  <Accordion.Button>Details&nbsp;</Accordion.Button>
               </Card>
               <Accordion.Body className="p-2">
                  <p>{address.street}</p>
                  <p>{address.postal} {address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.country}</p>
                  <ToggleButton className="" id="toggle-check" type="checkbox" variant="outline-primary" checked={address.isDefault}
                     onChange={(e) => handleDefaultToggles(e, address)}
                  ></ToggleButton>
               </Accordion.Body>
            </Accordion.Item>
         ))}
         {noAddresses && <p className="align-self-center text-center">Sie haben noch keine Lieferadresse gespeichert.</p>}
      </Accordion>
   );
}
