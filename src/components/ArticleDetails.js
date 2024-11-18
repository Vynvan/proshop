import { Button, Card, Col, Image } from "react-bootstrap";

export default function ArticleDetails({ article, setSelectedArticle }) {
   return (
      <Card className="details mx-1 p-md-3 p-2">
         <Card.Header className="d-flex justify-content-between">
            <Card.Title>{article.title}</Card.Title>
            <Button variant="close" onClick={() => setSelectedArticle(null)} aria-label="Close" />
         </Card.Header>
         <Card.Body className='row'>
            <Image src={article.image} srcSet="2922280_27002.jpg" alt={article.title} 
               className="mb-2 col-md-6" fluid />
            <Col sm="6"className='px-2 py-4'>
               <Card.Title >{article.title}</Card.Title>
               <p>Preis: {article.price} €</p>
            </Col>
            <p>{article.text}</p>
         </Card.Body>
         <Card.Footer>
            
         </Card.Footer>
      </Card>
   );
}