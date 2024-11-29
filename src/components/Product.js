import { useState } from 'react';
import { Button, Card, Fade } from 'react-bootstrap';
import useCart from '../hooks/CartProvider';

/**
 * @module Components
 */

/**
 * A product component that displays product details including an image, title, description, and price.
 * It allows users to add the product to their cart and handles image loading and errors.
 * 
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.product - The product object containing details to display.
 * @param {string} props.product.title - The title of the product.
 * @param {string} props.product.text - A brief description of the product.
 * @param {number} props.product.price - The price of the product.
 * @param {string} [props.product.image] - The URL of the product image.
 * @param {function} props.onClick - A function to handle click events on the product card.
 * @returns {JSX.Element} The rendered product card.
 * @example
 * // Usage of the Product component
 * <Product product={{ title: 'Sample Product', text: 'This is a great product.', price: 19.99 }} onClick={() => console.log('Product clicked!')} />
 */
function Product({ product, onClick }) {
   const { addToCart } = useCart();
   const [show, setShow] = useState(false);
   const [imageSrc, setImageSrc] = useState(product.image ?? 'placeholder.jpg');

   return (
      <Fade in={show}>
         <Card className='product'>
            <Card.Img variant='top' className='p-2 image pointer' srcSet={`${process.env.REACT_APP_APIURL}/${imageSrc}`} 
            onClick={onClick} onLoad={() => setShow(true)} onError={() => setImageSrc('placeholder.jpg')} />
            <Card.Title className='px-lg-4 px-md-3 px-2 pointer' onClick={onClick}>{product.title}</Card.Title>
            <Card.Text className='px-lg-4 px-md-3 px-2'>{product.text + (product.text.length === 50 ? '...' : '')}</Card.Text>
            <Card.Footer className='d-flex align-items-center justify-content-between'>
               <span>{product.price} €</span>
               <Button className='rounded-circle' onClick={() => addToCart(product)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-cart-plus" viewBox="0 0 16 16">
                     <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                     <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                  </svg>
               </Button>
            </Card.Footer>
         </Card>
      </Fade>
   );
}

export default Product;
