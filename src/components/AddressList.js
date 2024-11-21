import { useState } from 'react';
import { Accordion, Button, Card, ToggleButton } from 'react-bootstrap';

export default function AddressList({ addresses, setEdit, setNew }) {
   const [activeKey, setActiveKey] = useState(null);

   const handleDefaultToggles = (e, address) => {
      const checked = e.currentTarget.checked
      console.log(`CHECKED ${address.name} to ${checked}`);
   };

   if (!addresses || addresses.length === 0) return (
      <div className='my-3 container-fluid d-flex flex-column'>
         <p className='mb-2 mx-auto'>Sie haben noch keine Lieferadresse gespeichert.</p>
         <div className='mb-2 d-flex justify-content-around'>
            <Button onClick={() => setNew()}>Adresse hinzufügen</Button>
         </div>
      </div>
   );

   return (
      <>
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
                     >Bevorzugte Adresse</ToggleButton>
                     <div className='d-flex justify-content-arround'>
                        <Button onClick={() => setEdit(address)}>Bearbeiten</Button>
                     </div>
                  </Accordion.Body>
               </Accordion.Item>
            ))}
         </Accordion>
         <div className='d-flex justify-content-around'>
            <Button onClick={() => setNew()}>Adresse hinzufügen</Button>
         </div>
      </>
   );
}
