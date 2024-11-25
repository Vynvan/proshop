import { useDebounce, useEffect, useState } from 'react';

const breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 };

const getBreakpoint = () => {
   const width = window.innerWidth;
   if (width < breakpoints.sm) return 'xs';
   if (width < breakpoints.md) return 'sm';
   if (width < breakpoints.lg) return 'md';
   if (width < breakpoints.xl) return 'lg';
   if (width < breakpoints.xxl) return 'xl';
   return 'xxl';
};

export default function useBreakpoint() {
   const [breakpoint, setBreakpoint] = useState(getBreakpoint());

   useEffect(() => {
      const handleResize = () => setBreakpoint(getBreakpoint());
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return useDebounce(breakpoint, 200);
}
