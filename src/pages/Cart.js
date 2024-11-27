import { useState } from "react";
import { Accordion, Button, ButtonGroup, Card, Container, Image } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import useCart from "../hooks/CartProvider";

export default function Cart() {
   const { cart, addToCart, decrement, removeFromCart } = useCart();
   const [activeKey, setActiveKey] = useState(null);
   const navigate = useNavigate();

   if (!cart || cart.length === 0) return (
      <Container  fluid='md'>
         <p className="align-self-center text-center">Sie haben noch keine Artikel im Warenkorb.</p>
      </Container>
   );

   return (
      <Container  fluid='md'>
         <Accordion activeKey={activeKey}>
            {cart.map(product => (
               <Accordion.Item className="cart-item" eventKey={product.id} key={product.id}>
                  <Card className="m-0 border-0 flex-0-0 flex-row align-items-center">
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
                  <Accordion.Body className="p-2 d-flex">
                     <Image className="col-6 col-md-5 col-lg-4 col-xl-3 image" src={`${process.env.REACT_APP_APIURL}/${product.image ?? 'placeholder.jpg'}`} 
                     alt={product.title} onError={(e) => e.target.src = 'placeholder.jpg'} fluid />
                     <span className="p-1 p-sm-2 p-md-3 p-lg-4 col-6 col-md-7">{product.text}</span>
                  </Accordion.Body>
               </Accordion.Item>
            ))}
            <Card className="accordion-footer flex-row align-items-center flex-0-0 m-0">
               <span className="flex-grow-1 px-3 fw-bold">Gesamtpreis</span>
               <span className="price text-end fw-bold">
                  {(cart.map(article => article.price * article.quantity).reduce((prev, curr) => prev + curr)).toFixed(2)} €
               </span>
               <Button className="mx-3 my-2 px-3" onClick={() => navigate('/neworder')}>Kaufen</Button>
            </Card>
         </Accordion>
      </Container>
   );
}