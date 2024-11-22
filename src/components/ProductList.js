import { ListGroup } from 'react-bootstrap';

export default function ProductList({ products }) {
   return (
      <ListGroup>
         <ListGroup.Item className="d-flex">
            <span className="col-8 p-md-3 p-lg-4">Artikelname</span>
            <span className="col-2 p-md-3 p-lg-4">Anzahl</span>
            <span className="col-2 p-md-3 p-lg-4 text-center">Preis</span>
         </ListGroup.Item>
         {products &&
            products.map((product) => (
               <ListGroup.Item className="d-flex">
                  <span className="col-8 p-2 p-md-3 p-lg-4">{product.title}</span>
                  <span className="col-2 p-md-3 p-lg-4 text-center">{product.quantity}</span>
                  <span className="col-2 p-md-3 p-lg-4 text-center">{product.price * product.quantity} €</span>
               </ListGroup.Item>
            ))}
      </ListGroup>
   );
}
