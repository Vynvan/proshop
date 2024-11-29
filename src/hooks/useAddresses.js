import { useEffect, useState } from 'react';
import useFetch from './useFetch';
import useUser from './UserProvider';

/**
 * @module Hooks
 */

/**
 * Custom hook for fetching user addresses.
 *
 * @returns {Object} An object containing:
 * @returns {Array} addresses - The list of user addresses.
 * @returns {Object|null} error - The error object if an error occurred during fetching.
 * @returns {boolean} loading - Indicates if the addresses are currently being loaded.
 * @returns {Function} setAddresses - Function to manually set the addresses.
 * @returns {Function} reload - Function to reload the addresses from the server.
 */
function useAddresses() {
   const { error, fetchUrl, loading, result } = useFetch();
   const { user } = useUser();
   const [addresses, setAddresses] = useState([]);

   useEffect(() => {
      if (user) fetchUrl('address');
   }, [addresses, fetchUrl, user]);

   useEffect(() => {
      if (result?.addresses) setAddresses(result.addresses);
   }, [result, setAddresses]);

   const reload = () => fetchUrl('address');

   return { addresses, error, loading, setAddresses, reload };
};

export default useAddresses;
