import { useDebounce, useEffect, useState } from 'react';

/**
 * @module Hooks
 */

const breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 };

/**
 * Determines the current breakpoint based on the window's width.
 *
 * @returns {string} The current breakpoint (e.g., 'xs', 'sm', 'md', 'lg', 'xl', 'xxl').
 */
const getBreakpoint = () => {
   const width = window.innerWidth;
   if (width < breakpoints.sm) return 'xs';
   if (width < breakpoints.md) return 'sm';
   if (width < breakpoints.lg) return 'md';
   if (width < breakpoints.xl) return 'lg';
   if (width < breakpoints.xxl) return 'xl';
   return 'xxl';
};

/**
 * Custom hook that provides the current responsive breakpoint.
 * DROPPED FEATURE: This hook was developed to dynamically change the products limit to fetch depending on the screen width.
 *
 * @returns {string} The current breakpoint, debounced by 200 milliseconds.
 */
function useBreakpoint() {
   const [breakpoint, setBreakpoint] = useState(getBreakpoint());

   useEffect(() => {
      const handleResize = () => setBreakpoint(getBreakpoint());
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return useDebounce(breakpoint, 200);
}

export default useBreakpoint;
