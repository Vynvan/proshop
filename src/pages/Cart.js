import { Accordion, Button, ButtonGroup, Card, Image } from "react-bootstrap";
import useCart from "../hooks/CardProvider";

export default function Cart() {
   const { cart, addArticle, decrement, removeArticle } = useCart();
   const noArticles = cart === undefined || cart === null || cart.length === 0;

   return (
      <Accordion>
         {cart.map(article => (
            <Accordion.Item  className="cart-item" eventKey={article.product_id}>
               <Card className="flex-row align-items-center flex-0-0">
                  <span className="flex-grow-1">{article.title}</span>
                  <ButtonGroup className="mx-2">
                     <Button onClick={() => decrement(article)}>-</Button>
                     <Button>{article.quantity}</Button>
                     <Button onClick={() => addArticle(article)}>+</Button>
                  </ButtonGroup>
                  <Button className="mx-2" onClick={() => removeArticle(article)}>Entfernen</Button>
                  <span>{article.price} €</span>
                  <Accordion.Button>Details&nbsp;</Accordion.Button>
               </Card>
               <Accordion.Body>
                  <Image src={article.image} srcSet="2922280_27002.jpg" alt={article.title} 
                  className="col-md-6" fluid />
                  <span>{article.text}</span>
               </Accordion.Body>
            </Accordion.Item>
         ))}
         {noArticles && <p className="align-self-center text-center">Sie haben noch keine Artikel im Warenkorb.</p>}
      </Accordion>
   );
}