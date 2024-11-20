import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import ProductDetails from './ProductDetails';

export default function Products() {
   const [page, setPage] = useState(1);
   const [products, setProducts] = useState([]);
   
   const testArticles = [
      {
         title: 'Artikel 1',
         text: 'Dies ist der Text für Artikel 1.',
         image: 'https://example.com/image1.jpg',
         price: 19.99,
         id: 'prod_001',
      },
      {
         title: 'Artikel 2',
         text: 'Dies ist der Text für Artikel 2.',
         image: 'https://example.com/image2.jpg',
         price: 29.99,
         id: 'prod_002',
      },
      {
         title: 'Artikel 3',
         text: 'Dies ist der Text für Artikel 3.',
         image: 'https://example.com/image3.jpg',
         price: 39.99,
         id: 'prod_003',
      },
      {
         title: 'Artikel 4',
         text: 'Dies ist der Text für Artikel 4.',
         image: 'https://example.com/image4.jpg',
         price: 49.99,
         id: 'prod_004',
      },
      {
         title: 'Artikel 5',
         text: 'Dies ist der Text für Artikel 5.',
         image: 'https://example.com/image5.jpg',
         price: 59.99,
         id: 'prod_005',
      },
   ];
   const [selectedArticle, setSelectedArticle] = useState(null);

   return (
      <>
         {!selectedArticle && (
            <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="mx-1 p-md-3 p-2">
               {testArticles.map((product) => {
                  return (
                     <Col key={product.product_id} className="g-md-3 g-2">
                        <Product product={product} onClick={() => setSelectedArticle(product)} />
                     </Col>
                  );
               })}
            </Row>
         )}
         {selectedArticle && <ProductDetails article={selectedArticle} setSelectedArticle={setSelectedArticle} />}
      </>
   );
}