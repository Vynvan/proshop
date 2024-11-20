import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import ProductDetails from './ProductDetails';
import useProducts from '../hooks/ProductProvider';

export default function Products() {
   const [page, setPage] = useState(1);
   const { error, productPages } = useProducts();
   const [products, setProducts] = useState([]);
   
   useEffect(() => {
      if (!error) setProducts(productPages.map(pp => pp.items).reduce((prev, curr) => [...prev, ...curr], []));
   }, [productPages]);

   const [selectedArticle, setSelectedArticle] = useState(null);

   return (
      <>
         {!selectedArticle && (
            <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="mx-1 p-md-3 p-2">
               {products.map((product) => {
                  return (
                     <Col key={product.id} className="g-md-3 g-2">
                        <Product product={product} onClick={() => setSelectedArticle(product)} />
                     </Col>
                  );
               })}
            </Row>
         )}
         {selectedArticle && <ProductDetails product={selectedArticle} setSelectedArticle={setSelectedArticle} />}
      </>
   );
}
