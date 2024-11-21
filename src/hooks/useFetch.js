import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from './UserProvider';

export default function useFetch() {
   const navigate = useNavigate();
   const { user } = useUser();
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const [method, setMethod] = useState('GET');
   const [result, setResult] = useState(null);
   const [url, setUrl] = useState('');

   useEffect(() => {
      const doFetch = async () => {
         if (!url || !user) return;

         try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_APIURL}/${url}`, {
               headers: {
                  Authorization: `Bearer ${user.token}`,
                  'Content-Type': 'application/json'
               },
               method,
            });

            const asJson = await response.json();
            if(response.ok) {
               setResult(asJson);
            }
            else if (response.status === 403) {
               navigate('/login?forbidden=true');
            }
            else if (asJson?.message) setError(asJson);
         }
         catch(err) {
            setError(err);
            console.log('### Fetch error:', err)
         }
         finally {
            setLoading(false);
         }
      }
      doFetch();
   }, [url]);

   function fetchUrl(url, method='GET') {
      setMethod(method);
      setUrl(url);
   }

   return { error, loading, result, fetchUrl };
}