import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useFetch from './useFetch';

const ProductContext = createContext();

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

export default function useProducts () {
   return useContext(ProductContext);
};
