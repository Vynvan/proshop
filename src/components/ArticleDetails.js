import { Button, Card, Image, Overlay } from "react-bootstrap";

export default function ArticleDetails({ show, onHide, article, target }) {
   return (
      <Overlay target={target} show={show} onHide={onHide} placement="top">
      {({
         placement: _placement,
         arrowProps: _arrowProps,
         show: _show,
         popper: _popper,
         hasDoneInitialMeasure: _hasDoneInitialMeasure
      }) => (<Card className='overlay'>
                  <Card.Header>
               <Card.Title>{article.title}</Card.Title>
               <Button variant="close" onClick={onHide} aria-label="Close" />
            </Card.Header>
            <Card.Body>
               <Image src={article.image} srcSet='2922280_27002.jpg' alt={article.title} className="img-fluid mb-3" />
               <p>{article.text}</p>
               <p>Preis: {article.price} €</p>
            </Card.Body>
         </Card>)}
      </Overlay>
  );
}