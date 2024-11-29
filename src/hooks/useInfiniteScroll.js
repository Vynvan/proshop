import { useEffect, useState } from 'react';

/**
 * @module Hooks
 */

/**
 * Custom hook to implement infinite scrolling functionality.
 * This hook listens for scroll events on the window and triggers a loadMore function when the user reaches the bottom of the page. 
 * It manages a loading state to prevent multiple simultaneous fetches.
 * 
 * @param {Function} loadMore - A function that is called to load more data when the user scrolls to the bottom of the page.
 * 
 * @returns {Array} An array containing:
 * @returns {boolean} isLoading - A boolean indicating if data is currently being loaded.
 * @returns {Function} setIsLoading - A function to manually set the loading state.
 */
function useInfiniteScroll (loadMore) {
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading)
            return;

         setIsLoading(true);
         loadMore();
      };      
      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
   }, [loadMore, isLoading]);

   return [isLoading, setIsLoading];
}

export default useInfiniteScroll;
