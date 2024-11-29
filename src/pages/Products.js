import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import useProducts from '../hooks/ProductProvider';
import { useNavigate } from 'react-router-dom';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

/**
 * Products component fetches and displays a list of products.
 * It supports infinite scrolling to load more products as the user scrolls down.
 *
 * @returns {JSX.Element} The rendered list of products.
 */
function Products() {
   const navigate = useNavigate();
   const { error, page, productPages, setPage } = useProducts();
   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useInfiniteScroll(() => setPage(prev => prev + 1));

   useEffect(() => {
      if (page === 0) setPage(1);
   }, [page, setPage]);
   
   useEffect(() => {
      if (!error) {
         setProducts(productPages.map(pp => pp.items).reduce((prev, curr) => [...prev, ...curr], []));
      }
      if (isLoading) setIsLoading(false);
   }, [error, isLoading, productPages, setIsLoading]);

   if (error) return (
      <div className='container-fluid d-flex'>
         <p className='m-auto'>Ein Fehler ist aufgetreten... bitte Seite neu laden.</p>
      </div>
   );

   return (
      <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="mx-1 p-md-3 p-2">
         {products.map((product) => {
            return (
               <Col key={product.id} className="g-2 g-md-3">
                  <Product product={product} onClick={() => navigate(`/${product.id}`)} />
               </Col>
            );
         })}
      </Row>
   );
}

export default Products;
