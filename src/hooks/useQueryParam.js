import { useLocation, useNavigate } from 'react-router-dom';

/**
 * @module Hooks
 */

/**
 * Custom hook to manage query parameters in the URL.
 * This hook provides a way to get and set a specific query parameter from the URL.
 * It uses the React Router's `useLocation` and `useNavigate` hooks to access and manipulate the query string.
 * 
 * @param {string} paramName - The name of the query parameter to manage.
 * @returns {Array} An array containing:
 * @returns {string|null} The current value of the specified query parameter, or null if it does not exist.
 * @returns {Function} setQueryParam - A function to set the value of the specified query parameter and update the URL.
 */
function useQueryParam (paramName) {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const setQueryParam = (value) => {
        query.set(paramName, value);
        navigate(`?${query.toString()}`);
    };
    return [query.get(paramName), setQueryParam];
};

export default useQueryParam;
