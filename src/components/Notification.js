import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

export default function Notification({ className, notification }) {
   const [ message, setMessage ] = useState('');
   const [ messageType, setMessageType ] = useState('danger');

   useEffect(() => {
      if (notification && notification.text) setMessage(notification.text);
      else setMessage(notification ?? '');
      if (notification && notification.type) setMessageType(notification.type);
      else setMessageType('danger');
   }, [notification]);

   useEffect(() => {
      if (message !== '' && messageType !== 'danger') {
         setTimeout(() => setMessage(''), 3000);
      }
   }, [message]);

   return (
      <>
         {message && <Alert className={className ? className : '' + 'text-center'} variant={messageType}>{message}</Alert>}
      </>
   );
}