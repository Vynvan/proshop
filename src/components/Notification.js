import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

/**
 * @module Components
 */

/**
 * A notification component that displays alert messages to the user.
 * It handles different types of messages and auto-dismisses non-danger messages after a specified duration.
 * 
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} [props.className] - Additional CSS class names to apply to the alert.
 * @param {Object} props.notification - The notification object containing the message and type.
 * @param {string} [props.notification.text] - The message text to display in the alert.
 * @param {string} [props.notification.type] - The type of alert (e.g., 'success', 'warning', 'danger').
 * @returns {JSX.Element} The rendered notification alert.
 * @example
 * // Usage of the Notification component
 * <Notification className="custom-class" notification={{ text: 'Operation successful!', type: 'success' }} />
 */
function Notification({ className, notification }) {
   const [ message, setMessage ] = useState('');
   const [ messageType, setMessageType ] = useState('danger');

   useEffect(() => {
      if (notification) {
         setMessage(notification.length ? notification : notification.text ?? '');
         setMessageType(notification.type ?? 'danger');
      }
   }, [notification]);

   useEffect(() => {
      if (message !== '' && messageType !== 'danger') {
         setTimeout(() => setMessage(''), 3000);
      }
   }, [message, messageType]);

   return (
      <>
         {message &&
         <Alert className={(className ? className + ' ' : '') + 'my-3 align-self-center text-center'} 
         variant={messageType}>
            {message}
         </Alert>}
      </>
   );
}

export default Notification;
