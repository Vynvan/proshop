import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

/**
 * Default values for the address form fields.
 * @constant {Object}
 * @property {string} name - The name of the address.
 * @property {string} street - The street of the address.
 * @property {string} city - The city of the address.
 * @property {string} state - The state of the address (optional).
 * @property {string} postal - The postal code of the address.
 * @property {string} country - The country of the address (default is 'Deutschland').
 * @property {number} isDefault - Indicates if this address is the default address (0 or 1).
 */
export const formDefaults = { name: '', street: '', city: '', state: '', postal: '', country: 'Deutschland', isDefault: 0 };

/**
 * AddressForm component for adding or editing an address. If an address is given, the form uses it as default value and 
 * shows the edit form title, otherwise the new address title is used.
 *
 * @category Components
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.address - The address object to edit (optional).
 * @param {function} props.saveAddress - The function to call when saving the address.
 * @returns {JSX.Element} The rendered AddressForm component.
 */
export default function AddressForm({ address, saveAddress }) {
   const [formData, setFormData] = useState({ ...formDefaults });

   useEffect(() => {
      setFormData(address ? { ...address } : { ...formDefaults });
   }, [address]);

   const handleInputChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      console.log(formData)
   };

   return (
      <Card className="my-5 p-2 p-sm-3 p-md-4 justify-content-center text-start shadow">
         <Card.Title>Adresse {address?.id ? "bearbeiten" : "hinzufügen"}</Card.Title>
         <Form onSubmit={(e) => saveAddress ? saveAddress(e, formData) : null}>
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
               <Form.Label>Bundesland (optional):</Form.Label>
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
            <Form.Group className="d-flex justify-content-around">
               <Button type="submit">Adresse speichern</Button>
               <Button onClick={(e) => saveAddress(e, null)}>Abbrechen</Button>
            </Form.Group>
         </Form>
      </Card>
   );
}
