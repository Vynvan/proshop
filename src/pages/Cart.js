import { useState } from "react";
import { Accordion, Button, ButtonGroup, Card, Image } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import useCart from "../hooks/CartProvider";

export default function Cart() {
   const { cart, addToCart, decrement, removeFromCart } = useCart();
   const noProducts = cart === undefined || cart === null || cart.length === 0;
   const [activeKey, setActiveKey] = useState(null);
   const [ notification, setNotification ] = useState('');
   const navigate = useNavigate();

   const buy = async () => {
      try {
         const response = await fetch(`${process.env.REACT_APP_APIURL}/order`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ cart }),
         });

         const { message, success } = await response.json();
         if (response.ok && success === 1) {
            navigate(`/order&id=${response.id}`);
         } else {
            setNotification(message ?? 'Bestellung fehlgeschlagen!');
         }
      } catch (error) {
         setNotification('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
      }
   }

   return (
      <>
         <Notification notification={notification} className={"m-md-3 m-2"} />
         <Accordion activeKey={activeKey} className="mx-1 p-md-3 p-2">
            {cart.map(product => (
               <Accordion.Item className="cart-item border-0" eventKey={product.product_id} key={product.id}>
                  <Card className="flex-row align-items-center flex-0-0 m-0">
                     <span className="title flex-grow-1 px-3" onClick={() => setActiveKey(activeKey === product.product_id ? null : product.product_id)}>
                        {product.title}
                     </span>
                     <ButtonGroup className="mx-2">
                        <Button onClick={() => decrement(product)}>-</Button>
                        <Button>{product.quantity}</Button>
                        <Button onClick={() => addToCart(product)}>+</Button>
                     </ButtonGroup>
                     <Button className="mx-2" onClick={() => removeFromCart(product)}>Entfernen</Button>
                     <span className="price text-end">{(product.price * product.quantity).toFixed(2)} €</span>
                     <Accordion.Button>Details&nbsp;</Accordion.Button>
                  </Card>
                  <Accordion.Body className="p-2">
                     <Image src={product.image} srcSet="2922280_27002.jpg" alt={product.title} 
                     className="col-md-6 col-lg-4" fluid />
                     <span>{product.text}</span>
                  </Accordion.Body>
               </Accordion.Item>
            ))}
            {!noProducts && <Card className="accordion-footer flex-row align-items-center flex-0-0 m-0">
               <span className="flex-grow-1 px-3 fw-bold">Gesamtpreis</span>
               <span className="price text-end fw-bold">
                  {(cart.map(article => article.price * article.quantity).reduce((prev, curr) => prev + curr)).toFixed(2)} €
               </span>
               <Button className="mx-3 my-2 px-3" onClick={() => buy()}>Kaufen</Button>
            </Card>}
            {noProducts && <p className="align-self-center text-center">Sie haben noch keine Artikel im Warenkorb.</p>}
         </Accordion>
      </>
   );
}