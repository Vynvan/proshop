import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useFetch from './useFetch';

/**
 * @module Hooks
 */

/**
 * A context for managing product data. Private (not exported)!
 * @type {React.Context}
 */
const ProductContext = createContext();

/**
 * Provider component that fetches and provides product data to its children.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children components that can access the product context.
 * @returns {JSX.Element} The ProductProvider component.
 */
export function ProductProvider({ children }) {
   const [detailedProducts, setDetailedProducts] = useState({});
   const [page, setPage] = useState(0);
   const [productPages, setProductPages] = useState([]);
   const [total, setTotal] = useState(-1);
   const { error, fetchUrl, loading, result } = useFetch();
   const limit = 10;

   useEffect(() => {
      if (page > 0 && !loading) {
         const pageLoaded = productPages.some(pp => pp.limit === limit && pp.page === page);
         const totalLoaded = productPages.map(pp => pp.items.length).reduce((prev, curr) => prev + curr, 0);
         if (!pageLoaded && (totalLoaded < total || total === -1))
            fetchUrl(`products?page=${page}&limit=${limit}`);
      }
   }, [fetchUrl, loading, page, productPages, total]);

   useEffect(() => {
      if (result) {
         if (result.products) {
            const { limit, page, products } = result;
            if (!productPages.some(pp => pp.limit === limit && pp.page === page))
               setProductPages(prev => [...prev, { limit, page, items: products }]);
         }
         else if (result.product) {
            const { product } = result;
            setDetailedProducts((prev) => {
               const combined = { ...prev[product.id], ...product };
               return { ...prev, [product.id]: combined };
            });
         }

         if (result.total) setTotal(result.total);
      }
   }, [result]);

   /**
    * Retrieves detailed product object by product ID. This is used to send an imediate response to the ProductDetails component. 
    * If the detailed description needs to be fetched, the available product object with short description is returned to show this 
    * instead of a loading spinner.
    *
    * @param {string} id - The ID of the product to retrieve.
    * @returns {Object|null} The detailed product information OR the product object with short description OR null if not in store.
    */
  const getDetailed = (id) => {
      if (detailedProducts && detailedProducts[id]) return detailedProducts[id];
      else if (productPages) {
         const product = productPages.map(pp => pp.items)
         .reduce((prev, items) => prev === null ? items.find(p => p.id === id) : prev, null);
         if (product) {
            fetchUrl(`products/${id}?update=true`);
            setDetailedProducts(prev => ({ ...prev, [id]: product }));
            return product;
         }
         else fetchUrl(`products/${id}`);
      }
      return null;
   }

   return <ProductContext.Provider value={{ detailedProducts, error, getDetailed, loading, page, productPages, setPage }}>
      {children}
   </ProductContext.Provider>;
};

/**
 * Access to the ProductProviders context via a hook.
 * 
 * @returns {React.Context} A hook to use everything the ProductProvider offers.
 */
function useProducts () {
   return useContext(ProductContext);
};

export default useProducts;
