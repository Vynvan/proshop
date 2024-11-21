import { createContext, useContext, useEffect, useState } from 'react';
import useFetch from './useFetch';
import useUser from './UserProvider';

const ProductContext = createContext();

export function ProductProvider({ children }) {
   const [detailedProducts, setDetailedProducts] = useState({});
   const [limit, setLimit] = useState(10);
   const [page, setPage] = useState(0);
   const [productPages, setProductPages] = useState([]);
   const { error, fetchUrl, loading, result } = useFetch();
   const { user } = useUser();

   useEffect(() => {
      if (!user) {
         setProductPages([]);
         setDetailedProducts([]);
         return;
      };
      
      if (page !== 0) {
         let productPage = productPages.find((pageObject => pageObject.page === page));
         if (productPage) return;
         fetchUrl(`products?page=${page}&limit=${limit}`);
      }
   }, [page, fetchUrl, user]);

   useEffect(() => {
      console.log('ProductProvider response:', result)
      if (result?.products) {
         const { limit, page, products } = result;
         const productPage = { limit, page, items: products };
         setProductPages(prev => [...prev, productPage]);
      }
      else if (result?.product) {
         const { product } = result;
         setDetailedProducts((prev) => {
            const combined = { ...prev[product.id], ...product };
            prev[product.id] = { ...prev[product.id], ...product }
            return { ...prev, [product.id]: combined };
         });
      }
   }, [result]);

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

   return <ProductContext.Provider value={{ detailedProducts, error, getDetailed, loading, productPages, setPage }}>{children}</ProductContext.Provider>;
};

export default function useProducts () {
   return useContext(ProductContext);
};
