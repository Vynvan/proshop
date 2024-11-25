import { ListGroup } from 'react-bootstrap';

export default function ProductList({ products }) {
   return (
      <ListGroup>
         <ListGroup.Item className="d-flex" variant="secondary">
            <span className="col-8 px-md-2 px-lg-4 py-md-3">Artikelname</span>
            <span className="col-2 p-md-3 px-lg-4 text-center">Anzahl</span>
            <span className="col-2 p-md-3 px-lg-4 text-center">Preis</span>
         </ListGroup.Item>
         {products &&
            products.map((product) => (
               <ListGroup.Item className="d-flex" key={product.id}>
                  <span className="col-8 p-md-2 px-lg-4">{product.title}</span>
                  <span className="col-2 p-md-2 text-center">{product.quantity}</span>
                  <span className="col-2 p-md-2 text-center">{product.price * product.quantity} €</span>
               </ListGroup.Item>
            ))}
         <ListGroup.Item className="d-flex" variant="secondary">
            <span className="col-10 px-md-2 px-lg-4 py-md-3">Gesamtpreis</span>
            <span className="col-2 px-md-2 py-md-3 text-center">
               {products.map(p => p.price * p.quantity).reduce((prev, curr) => prev + curr)} €
            </span>
         </ListGroup.Item>
      </ListGroup>
   );
}
