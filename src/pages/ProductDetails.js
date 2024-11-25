import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useCart from "../hooks/CartProvider";
import useProducts from "../hooks/ProductProvider";

export default function ProductDetails() {
   const { addToCart } = useCart();
   const { id } = useParams();
   const { detailedProducts, getDetailed } = useProducts();
   const [product, setProduct] = useState({ title: '', text: '', price: '', image: '2922280_27002.jpg' });
   const [ count, setCount ] = useState(1);

   useEffect(() => {
      console.log('ProductDetails for', id, ':', detailedProducts[id])
      if (detailedProducts[id])
         setProduct(detailedProducts[id]);
      else {
         const preview = getDetailed(id);
         if (preview) setProduct(preview);
      }
   }, [id, detailedProducts, getDetailed]);

   function decrement() {
      if (count > 1) setCount(count - 1);
   }

   return (
      <Card className="detail mx-2s mx-md-3 mx-lg-4">
         <Card.Header className="d-flex justify-content-between">
            <Card.Title>{product.title}</Card.Title>
         </Card.Header>
         <Card.Body className='row'>
            <Image src={product.image} srcSet="2922280_27002.jpg" alt={product.title} 
               className="mb-2 col-md-6 col-lg-5 col-xl-4" fluid />
            <Col sm="12" md="6" lg="7" xl="8" className='px-2 py-4'>
               <Card.Title >{product.title}</Card.Title>
               <p>Preis: {product.price} €</p>
            </Col>
            <p>{product.text}</p>
         </Card.Body>
         <Card.Footer className="d-flex align-items-center justify-content-end">
            <ButtonGroup className="mx-2">
               <Button onClick={() => decrement()}>-</Button>
               <Button>{count}</Button>
               <Button onClick={() => setCount(count + 1)}>+</Button>
            </ButtonGroup>
            <span className="mx-2">{(product.price * count).toFixed(2)} €</span>
            <Button className='rounded-circle' onClick={() => addToCart(product, count)}>
               <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-cart-plus" viewBox="0 0 16 16">
                  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
               </svg>
            </Button>
         </Card.Footer>
      </Card>
   );
}
