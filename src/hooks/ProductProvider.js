import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useFetch from './useFetch';

const ProductContext = createContext();

export function ProductProvider({ children }) {
   const [detailedProducts, setDetailedProducts] = useState({});
   const [limit, setLimit] = useState(10);
   const [page, setPage] = useState(0);
   const [productPages, setProductPages] = useState([]);
   const [total, setTotal] = useState(-1);
   const { error, fetchUrl, loading, result } = useFetch();
   const neededPage = useMemo(() => productPages.find((pp => pp.page === page)), [page, productPages]);

   useEffect(() => {
      if (page > 0 && !loading) {
         const totalLoaded = productPages.map(pp => pp.items.length).reduce((prev, curr) => prev + curr, 0);
         if (neededPage === undefined && (totalLoaded < total || total === -1))
            fetchUrl(`products?page=${page}&limit=${limit}`);
      }
   }, [fetchUrl, loading, limit, neededPage, page, productPages, total]);

   useEffect(() => {
      console.log('ProductProvider response:', result)
      if (result) {
         if (result.products) {
            const { limit, page, products } = result;
            const productPage = { limit, page, items: products };
            if (neededPage === undefined)
               setProductPages(prev => [...prev, productPage]);
         }
         else if (result.product) {
            const { product } = result;
            setDetailedProducts((prev) => {
               const combined = { ...prev[product.id], ...product };
               prev[product.id] = { ...prev[product.id], ...product }
               return { ...prev, [product.id]: combined };
            });
         }

         if (result.total) setTotal(result.total);
      }
   }, [neededPage, result]);

   const getDetailed = (id) => {
      if (detailedProducts?.[id]) return detailedProducts[id];
      else {
         const containingPage = productPages.find(pp => pp.items.find(p => p.id === id) !== null);
         if (containingPage) {
            fetchUrl(`products/${id}?update=true`);
            return { ...containingPage.items.find(p => p.id === id), preview: true };
         }
         else fetchUrl(`products/${id}`);
      }
      return null;
   }

   return <ProductContext.Provider value={{ detailedProducts, error, getDetailed, loading, page, productPages, setPage }}>
      {children}
   </ProductContext.Provider>;
};

export default function useProducts () {
   return useContext(ProductContext);
};
