import { useState } from "react";
import { Accordion, Button, ButtonGroup, Card, Image } from "react-bootstrap";
import useCart from "../hooks/CardProvider";

export default function Cart() {
   const { cart, addArticle, decrement, removeArticle } = useCart();
   const noArticles = cart === undefined || cart === null || cart.length === 0;
   const [activeKey, setActiveKey] = useState(null);

   const handleToggle = (key) => {
      ;
   };

   function buy() {

   }

   return (
      <Accordion activeKey={activeKey} className="mx-1 p-md-3 p-2">
         {cart.map(article => (
            <Accordion.Item className="cart-item border-0" eventKey={article.product_id}>
               <Card className="flex-row align-items-center flex-0-0 m-0">
                  <span className="title flex-grow-1 px-3" onClick={() => setActiveKey(activeKey === article.product_id ? null : article.product_id)}>
                     {article.title}
                  </span>
                  <ButtonGroup className="mx-2">
                     <Button onClick={() => decrement(article)}>-</Button>
                     <Button>{article.quantity}</Button>
                     <Button onClick={() => addArticle(article)}>+</Button>
                  </ButtonGroup>
                  <Button className="mx-2" onClick={() => removeArticle(article)}>Entfernen</Button>
                  <span className="price text-end">{(article.price * article.quantity).toFixed(2)} €</span>
                  <Accordion.Button>Details&nbsp;</Accordion.Button>
               </Card>
               <Accordion.Body className="p-2">
                  <Image src={article.image} srcSet="2922280_27002.jpg" alt={article.title} 
                  className="col-md-6 col-lg-4" fluid />
                  <span>{article.text}</span>
               </Accordion.Body>
            </Accordion.Item>
         ))}
         {!noArticles && <Card className="accordion-footer flex-row align-items-center flex-0-0 m-0">
            <span className="flex-grow-1 px-3 fw-bold">Gesamtpreis</span>
            <span className="price text-end fw-bold">
               {(cart.map(article => article.price * article.quantity).reduce((prev, curr) => prev + curr)).toFixed(2)} €
            </span>
            <Button className="mx-3 my-2 px-3" onClick={() => buy()}>Kaufen</Button>
         </Card>}
         {noArticles && <p className="align-self-center text-center">Sie haben noch keine Artikel im Warenkorb.</p>}
      </Accordion>
   );
}