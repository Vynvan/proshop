import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function AddressForm({ addressToEdit, saveAddress }) {
   const formDefaults = { name: '', street: '', city: '', state: '', postal: '', country: 'Deutschland', defaultAddress: false };
   const [formData, setFormData] = useState(formDefaults);

   useEffect(() => {
      setFormData(addressToEdit ? { ...addressToEdit, defaultAddress: addressToEdit.isDefault } : formDefaults);
   }, [addressToEdit]);

   const handleInputChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      console.log(formData)
   };

   return (
      <>
         <h3>Adresse bearbeiten</h3>
         <Form onSubmit={(e) => saveAddress(e, formData)}>
            <Form.Group className="my-3">
               <Form.Label>Bezeichnung (zB. Hauptadresse):</Form.Label>
               <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Bezeichnung eingeben"
                  required
               />
            </Form.Group>
            <Form.Group className="my-3">
               <Form.Label>Straße:</Form.Label>
               <Form.Control
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="Straße eingeben"
                  required
               />
            </Form.Group>
            <Form.Group className="my-3">
               <Form.Label>Stadt:</Form.Label>
               <Form.Control
                  type='text'
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Stadt eingeben"
                  className="form-control"
                  required
               />
            </Form.Group>
            <Form.Group className="my-3">
               <Form.Label>Bundesland:</Form.Label>
               <Form.Control
                  type='text'
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Bundesland eingeben"
                  className="form-control"
               />
            </Form.Group>
            <Form.Group className="my-3">
               <Form.Label>Postleitzahl:</Form.Label>
               <Form.Control
                  type='text'
                  name="postal"
                  value={formData.postal}
                  onChange={handleInputChange}
                  placeholder="Postleitzahl eingeben"
                  className="form-control"
                  required
               />
            </Form.Group>
            <Form.Group className="my-3">
               <Form.Label>Land:</Form.Label>
               <Form.Control
                  type='text'
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Land eingeben"
                  className="form-control"
                  required
               />
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
               <Button type="submit">Adresse speichern</Button>
            </Form.Group>
         </Form>
      </>
   );
}
