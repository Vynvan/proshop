import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from './UserProvider';

export default function useFetch() {
   const navigate = useNavigate();
   const { user } = useUser();
   const [body, setBody] = useState(undefined);
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
               body
            });

            const asJson = await response?.json();
            if(response.ok) {
               setError(null);
               setResult(asJson);
            }
            else if (response.status === 403) {
               navigate('/login?forbidden=true');
            }
            else if (asJson?.message) setError(asJson);
         }
         catch(err) {
            setError(err);
            console.log('### Fetch error:', err, body, method, url)
         }
         finally {
            setBody(undefined);
            setLoading(false);
         }
      }
      doFetch();
   }, [body, method, navigate, url, user]);

   const fetchUrl = (url, method='GET', body=undefined) => {
      console.log('Start fetching:', url, method, body)
      if (body) setBody(JSON.stringify(body));
      setMethod(method);
      setUrl(url);
   };

   return { error, loading, result, fetchUrl };
}