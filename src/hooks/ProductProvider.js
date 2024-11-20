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
      if (productPage) return productPage.items;

      console.log('productPage:', productPage)

      setUrl(`products?page=${loadedPage}&limit=${limit}`);
   }, [loadedPage, setUrl]);

   useEffect(() => {
      if (result) {
         const { limit, page, products } = result;
         const productPage = { limit, page, items: products };
         setProductPages(prev => [...prev, productPage]);
      }
      console.log('response:', result)
   }, [result]);

   return <ProductContext.Provider value={{ error, loading, productPages, setLoadedPage }}>{children}</ProductContext.Provider>;
};

export default function useProducts () {
   return useContext(ProductContext);
};
