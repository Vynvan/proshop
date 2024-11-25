import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

export default function Notification({ className, notification }) {
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
