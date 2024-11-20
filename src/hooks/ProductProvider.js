import { createContext, useContext, useEffect, useState } from 'react';
import useFetch from './useFetch';

const ProductContext = createContext();

export function ProductProvider({ children }) {
   const [limit, setLimit] = useState(10);
   const [loadedPage, setLoadedPage] = useState(0);
   const [productPages, setProductPages] = useState([]);
   const [detailedProducts, setDetailedProducts] = useState([]);
   const { error, loading, result, setUrl } = useFetch();

   useEffect(() => {
      let productPage = productPages.find((pageObject => pageObject.page === loadedPage));
      if (productPage) return;
      setUrl(`products?page=${loadedPage}&limit=${limit}`);
   }, [loadedPage, setUrl]);

   useEffect(() => {
      if (result?.products) {
         const { limit, page, products } = result;
         const productPage = { limit, page, items: products };
         setProductPages(prev => [...prev, productPage]);
      }
      if (result?.product) {
         const { product } = result;
         setDetailedProducts((prev) => prev[product.id] = { ...prev[product.id], ...product });
      }
      console.log('response:', result)
   }, [result]);

   const getDetailed = (id) => {
      if (detailedProducts?.[id]) return detailedProducts[id];
      else {
         const containingPage = productPages.find(pp => pp.items.find(p => p.id === id) !== null);
         if (containingPage) {
            setUrl(`products/${id}?update=true`);
            return containingPage.items.find(p => p.id === id);
         }
         else setUrl(`products/${id}`);
      }
      return null;
   }

   return <ProductContext.Provider value={{ detailedProducts, error, getDetailed, loading, productPages, setLoadedPage }}>{children}</ProductContext.Provider>;
};

export default function useProducts () {
   return useContext(ProductContext);
};
