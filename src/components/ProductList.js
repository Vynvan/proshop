/**
 * @module Components
 */

import { ListGroup } from 'react-bootstrap';

/**
 * A component that displays a list of products in a structured format.
 * It shows the product name, quantity, and total price for each item, along with a summary of the total price.
 * 
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.products - An array of product objects to display in the list.
 * @param {Object} props.products[] - The product object containing details for each product.
 * @param {string} props.products[].id - The unique identifier for the product.
 * @param {string} props.products[].title - The name of the product.
 * @param {number} props.products[].quantity - The quantity of the product in the list.
 * @param {number} props.products[].price - The price of a single unit of the product.
 * @returns {JSX.Element} The rendered list of products.
 * @example
 * // Usage of the ProductList component
 * const products = [
 *   { id: '1', title: 'Product A', quantity: 2, price: 10 },
 *   { id: '2', title: 'Product B', quantity: 1, price: 15 }
 * ];
 * <ProductList products={products} />
 */
function ProductList({ products }) {
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

export default ProductList;
