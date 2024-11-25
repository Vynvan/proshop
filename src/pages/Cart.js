import { useState } from "react";
import { Accordion, Button, ButtonGroup, Card, Container, Image } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import useCart from "../hooks/CartProvider";

export default function Cart() {
   const { cart, addToCart, decrement, removeFromCart } = useCart();
   const noProducts = cart === undefined || cart === null || cart.length === 0;
   const [activeKey, setActiveKey] = useState(null);
   const navigate = useNavigate();

   if (noProducts) return (
      <Container  fluid='md'>
         <p className="align-self-center text-center">Sie haben noch keine Artikel im Warenkorb.</p>
      </Container>
   );

   return (
      <Container  fluid='md'>
         <Accordion activeKey={activeKey}>
            {cart.map(product => (
               <Accordion.Item className="cart-item border-0" eventKey={product.id} key={product.id}>
                  <Card className="flex-row align-items-center flex-0-0 m-0">
                     <span className="title flex-grow-1 px-3" onClick={() => setActiveKey(activeKey === product.id ? null : product.id)}>
                        {product.title}
                     </span>
                     <ButtonGroup className="mx-2">
                        <Button onClick={() => decrement(product)}>-</Button>
                        <Button>{product.quantity}</Button>
                        <Button onClick={() => addToCart(product)}>+</Button>
                     </ButtonGroup>
                     <Button className="mx-2" onClick={() => removeFromCart(product)}>Entfernen</Button>
                     <span className="price text-end">{(product.price * product.quantity).toFixed(2)} €</span>
                     <Accordion.Button onClick={() => setActiveKey(activeKey === product.id ? null : product.id)}>Details&nbsp;</Accordion.Button>
                  </Card>
                  <Accordion.Body className="p-2">
                     <Image src={product.image} srcSet="2922280_27002.jpg" alt={product.title} 
                     className="col-md-6 col-lg-4" fluid />
                     <span>{product.text}</span>
                  </Accordion.Body>
               </Accordion.Item>
            ))}
            <Card className="accordion-footer flex-row align-items-center flex-0-0 m-0">
               <span className="flex-grow-1 px-3 fw-bold">Gesamtpreis</span>
               <span className="price text-end fw-bold">
                  {(cart.map(article => article.price * article.quantity).reduce((prev, curr) => prev + curr)).toFixed(2)} €
               </span>
               <Button className="mx-3 my-2 px-3" onClick={() => navigate('/neworder')}>Bestellen</Button>
            </Card>
         </Accordion>
      </Container>
   );
}