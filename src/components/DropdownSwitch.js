import { Form } from 'react-bootstrap';

/**
 * @module Components
 */

/**
 * DropdownSwitch component that is a switch button optimized for a Bootstrap-react dropdown menu.
 * DROPPED FEATURE: This was developed as a button to switch on and off dark mode.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function DropdownSwitch({ labelName }) {

   return (
      <Form.Group className='d-flex dropdown-item complex-item'>
         <Form.Label className='mb-0 me-2'>{labelName}</Form.Label>
         <Form.Check name="theme" type="switch" variant="none"></Form.Check>
      </Form.Group>
   );
}

export default DropdownSwitch;
