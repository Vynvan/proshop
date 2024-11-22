import { useEffect, useState } from 'react';
import useFetch from './useFetch';
import useUser from './UserProvider';

export default function useAddresses() {
   const { error, fetchUrl, loading, result } = useFetch();
   const { user } = useUser();
   const [addresses, setAddresses] = useState([]);

   useEffect(() => {
      console.log('useAddresses fetching')
      if (user) fetchUrl('address');
   }, [addresses, user]);

   useEffect(() => {
      if (result?.addresses) setAddresses(result.addresses);
   }, [result, setAddresses]);

   const reload = () => fetchUrl('address');

   return { addresses, setAddresses, reload };
};
