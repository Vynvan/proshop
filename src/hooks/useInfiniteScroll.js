import { useEffect, useState } from 'react';

export default function useInfiniteScroll (loadMore) {
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
