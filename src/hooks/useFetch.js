import { useEffect, useState } from "react";
import useUser from './UserProvider';

export default function useFetch() {
   const { user } = useUser();
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const [result, setResult] = useState(null);
   const [url, setUrl] = useState('');

   useEffect(() => {
      const doFetch = async () => {
         if (!url) return;

         try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_APIURL}/${url}`, {
               headers: {
                  Authorization: `Bearer ${user.token}`,
                  'Content-Type': 'application/json'
               },
               method: 'GET',
            });
            const asJson = await res.json();
            if (asJson?.message) setError(asJson);
            else setResult(asJson);
         }
         catch(err) {
            setError(err);
         }
         finally {
            setLoading(false);
         }
      }
      doFetch();
   }, [url]);

   return { error, loading, result, setUrl };
}