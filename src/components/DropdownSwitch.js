import { Form } from 'react-bootstrap';

export default function DropdownSwitch({ labelName }) {

   return (
      <Form.Group className='d-flex dropdown-item complex-item'>
         <Form.Label className='mb-0 me-2'>{labelName}</Form.Label>
         <Form.Check name="theme" type="switch" variant="none"></Form.Check>
      </Form.Group>
   );
}
